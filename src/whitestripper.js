import fs from 'fs';
import trim from 'trim';
import DirWalker from 'node-dirwalker';
import confirm from 'confirm-cli';
import colors from 'colors/safe';

gatherFiles(files => {
  listFiles(files);

  confirm("Are you sure you want to continue?", yes, no);
  function yes() {
    console.log('Stripping...');
    files.forEach(file => processFile(file));
  }
  function no() {
    console.log("Aborted");
  }
});

function gatherFiles(callback) {
  const walker = DirWalker({
    ignoreFiles: ['.gitignore'],
    defaultIgnore: ['node_modules/', '.git', '.hg', '.svn', 'CVS'],
  });

  let files = [];
  walker
    .on('entry', entry => fileFilter(files, entry))
    .on('error', err => handleError(err))
    .on('close', () => callback(files));

  walker.walk('.', {
    recurse: true
  });
}

function fileFilter(files, entry) {
  if (entry.type === 'file' && validFile(entry.basename)) {
    files.push(entry.relname);
  }
}

function validFile(basename) {
  if (basename.endsWith('.html')
   || basename.endsWith('.css')
   || basename.endsWith('.scss')
   || basename.endsWith('.less')
   || basename.endsWith('.js')
   || basename.endsWith('.jsx')
   || basename.startsWith('.')) {
     return true;
   }

   return false;
}

function listFiles(files) {
  console.log("Found " + files.length + " files:\n");
  files.forEach(file => {
    console.log("=>", colors.red(file));
  });
  console.log("");
}

function processFile(filePath) {
  fs.readFile( './' + filePath, {encoding: 'utf8'}, (err, contents) => {
    if (err) {
      handleError(err);
    }

    writeFile(filePath, stripWhitespace(contents));
  });
}

const matchNewLines = new RegExp(/(.*)(\r?\n)/g);
function stripWhitespace(contents) {
  let line;
  let fixedContents = '';
  while (line = matchNewLines.exec(contents)) {
    fixedContents += trim.right(line[1]) + line[2];
  }

  return fixedContents;
}

function writeFile(filePath, fixedContents) {
  fs.writeFile('./' + filePath, fixedContents, err => {
    if (err) {
      handleError(err);
    }

    console.log('Done: ' + filePath);
  });
}

function handleError(err) {
  console.error(err);
  process.exit();
}
