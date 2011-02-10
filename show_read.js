function MarkNewIfUnread(link){
  CheckLinkId(GetLinkId(link), function(isRead){
    if (!isRead) MarkNew(link);
  })
}

function OnScroll(){
  var visibleLinks = GetAllLinks().filter(':inview');
  window.setTimeout(function(){
    visibleLinks.filter(':inview')
      .forEach(MarkRead)
      .select(GetLinkId).forEach(AddLinkId);
  }, 1000)
}

$(document).scroll(OnScroll);

GetAllLinks().forEach(MarkNewIfUnread);
OnScroll();