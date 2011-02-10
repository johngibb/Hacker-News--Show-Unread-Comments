function MarkNewIfUnread(link){
  link = $(link)
  CheckLinkId(GetLinkId(link), function(isRead){
    if (!isRead) MarkNew(link);
  })
}

GetAllLinks().forEach(MarkNewIfUnread);

GetAllLinks().remainInView(5000, function(){ 
  $(this).forEach(chain(MarkRead, bind(GetLinkId,AddLinkId)));
})