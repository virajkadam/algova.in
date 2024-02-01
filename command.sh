git init

git config core.fileMode false
git config core.autocrlf false

git add .
git commit -m "'$1'"

git rm -r --cached .
git add .
git commit -m "'$1'"

git pull origin main

chmod -R 777 ../algova.in/
chown -R www-data:www-data ../algova.in/

git push origin HEAD:main
