import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('imagine.db');

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
        'create table if not exists images (id text primary key, query text, image text, source text);'
    );
  });
};

const insertImage = (id, query, image, source) => {
    db.transaction(tx => {
        tx.executeSql(
            'insert into images (id, query, image, source) values (?, ?, ?, ?);',
            [id, query, image, source]
        );
    });
};

const getImages = (callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'select * from images;',
            [],
            (_, { rows }) => callback(rows._array)
        );
    });
};

const updateImage = (id, query, image) => {
    db.transaction(tx => {
        tx.executeSql(
            'update images set query = ?, image = ? where id = ?;',
            [query, image, id]
        );
    });
};

const deleteImage = (id) => {
    db.transaction(tx => {
        tx.executeSql(
            'delete from images where id = ?;',
            [id]
        );
    });
};

export default {
    createTable,
    insertImage,
    getImages,
    updateImage,
    deleteImage,
};
