var links = $('a[href^=item?id=]'); 

function getId(link){
  return link.attr('href').replace(/.*=/, '');
}

AddLinkId(1778913);
AddLinkId(1778742);

links.each(function(){
  var link = $(this);
  var block = $(this).closest('td.default');
  var id = getId(link);
  CheckLinkId(id, function(isRead){
    if (isRead) {
      block.find("*").css('color', 'grey')
    }
    else {
      link.after( " *NEW");    
    }  
  });
})