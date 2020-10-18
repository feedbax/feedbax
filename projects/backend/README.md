docker run --rm -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db -d -p 9000:3306 mysql
mysql --host=127.0.0.1 --port=9000 --user=root --password=root db < db.sql
mysqldump --host=127.0.0.1 --port=9000 --user=root --password=root --no-data db > db.sql
