function MarkNewIfUnread(link){
  CheckLinkId(GetLinkId(link), function(isRead){
    if (!isRead) MarkNew(link);
  })
}

GetAllLinks().forEach(MarkNewIfUnread);

GetAllLinks().remainInView(1000, function(){ 
  $(this).forEach(MarkRead).select(GetLinkId).forEach(AddLinkId);
})