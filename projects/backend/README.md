docker run --name meinsql --rm -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=db -d -p 9000:3306 mysql
mysql --host=127.0.0.1 --port=9000 --user=root --password=root db < db.sql
mysqldump --host=127.0.0.1 --port=9000 --user=root --password=root --no-data db > db.sql

docker exec -i meinsql sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < db.sql
docker exec meinsql sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" --no-data db --ignore-table=db._Migration' > db.sql
