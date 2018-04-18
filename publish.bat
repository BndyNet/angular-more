@echo off
echo Publish to npm registry ...
echo Please specify the version type:

echo 1. NONE - Use current version
echo 2. patch
echo 3. minor
echo 4. major

choice  /c 1234 /m "Type:"
  
if %errorlevel%==1 goto none
if %errorlevel%==2 goto patch
if %errorlevel%==3 goto minor
if %errorlevel%==4 goto major

:none
    echo Begin to publish using current version ...
    goto common

:patch
    echo Begin to publish patch version ...
    echo Push to git ...
    git add .
    git commit -m "NPM: autocommit for publishing patch version"
    git push
    npm version patch
    goto common

:minor
    echo Begin to publish minor version ...
    echo Push to git ...
    git add .
    git commit -m "NPM: autocommit for publishing minor version"
    git push
    npm version minor 
    goto common

:major
    echo Begin to publish major version ...
    echo Push to git ...
    git add .
    git commit -m "NPM: autocommit for publishing major version"
    git push
    npm version major
    goto common

:common
    echo Building...
    npm run build

    echo Publishing...
    npm publish

    echo Push to git ...
    git add .
    git commit -m "NPM: autocommit after npm publishing"
    git push

:end
    echo End