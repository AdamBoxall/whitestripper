# WhiteStripper
Easily strip out the unpleasant trailing whitespace from all of your project files.

## Installation
WhiteStripper is intended to be installed as a global, utility module.
To install with npm, just run:
~~~
npm install -g whitestripper
~~~

## Usage
In a terminal at the root of your project, just run:
~~~
whitestripper
~~~

WhiteStripper will look for a `.gitignore` file in the root of your project, and then ignore any files or directories that match against the rules.

## TODO

Better ignore/whitelisting
