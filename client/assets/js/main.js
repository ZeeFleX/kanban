$(document).ready(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    var newName = $('input#name').val();

    $.post('/api/updateUser', { id: 1, newName: newName }, function(data){
      console.log(data);
    });
  });
});
