$tempDir = Join-Path $env:TEMP "gh-pages-deploy-learn"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir
xcopy /E /I /Y dist $tempDir

git checkout --orphan gh-pages-learn
git rm -rf .
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

xcopy /E /I /Y "$tempDir\*" .
git add -A
git commit -m "Deploy redesigned mobile Learning section (index-UqKu4xnm.js)"
git push origin gh-pages-learn:refs/heads/gh-pages --force
git checkout main
git branch -D gh-pages-learn
