var db = openDatabase('ReadLinks', '1.0', 'readlinks', 2 * 1024 * 1024);

function GetDB(){
  return db;
}

function EnsureTable(){
  GetDB().transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ReadLinks (linkId int unique)');
  })
}

function AddLinkId(linkId){
    GetDB().transaction(function (tx) {
      tx.executeSql('INSERT INTO ReadLinks (linkId) VALUES (?)', [linkId]);
    });
}

function CheckLinkId(linkId, callback){
    GetDB().transaction(function (tx) {
      tx.executeSql('select * from ReadLinks where linkId = ?', [linkId], function(tx, results){
        callback(results.rows.length > 0);
      });
    });
}

EnsureTable();