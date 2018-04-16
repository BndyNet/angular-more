#!/usr/bin/env bash

PROJECT_VERSION=""

getVersion() {
    PROJECT_VERSION=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
}

getVersion
echo "Old Version: " $PROJECT_VERSION

echo Publish to npm registry ...
echo Please specify the version type:

choices=( 'patch' 'minor' 'major' )

select choice in "${choices[@]}"; do
  [[ -n $choice ]] || { echo "Invalid choice." >&2; continue; }

  # git add .
  # git commit -m "NPM: autocommit for publishing new version"
  # git push

  case $choice in
    patch)
      echo "Begin to publish patch version ..."
      npm version patch
      ;;
    minor)
      echo "Begin to publish minor version ..."
      npm version minor 
      ;;
    major)
      echo "Begin to publish major version ..."
      npm version major
      ;;
  esac
  break
done

getVersion
npm run build
npm publish

git add .
git commit -m "NPM: autocommit via npm publish for v$PROJECT_VERSION"
git push