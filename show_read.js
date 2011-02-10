var links = $('a[href^=item?id=]'); 

function getId(link){
  return link.attr('href').replace(/.*=/, '');
}

var readLinks = { 1778913 :0, 1778742: 0 };

links.each(function(){
  var link = $(this);
  var block = $(this).closest('td.default');
  var id = getId(link);
  if (id in readLinks) {
    block.find("*").css('color', 'grey')
  }
  else {
    link.after( " *NEW");    
  }
})