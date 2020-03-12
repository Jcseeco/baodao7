$(document).ready(function() {
  //mouse tracking gradient effect
  $('.gradient-tracking').mousemove(function(event) {
    var width = $(this).width();
    var height = $(this).height();

    mouseXpercentage = Math.round(event.pageX / width * 100);
    mouseYpercentage = Math.round(event.pageY / height * 100);

    $(this).css('background', 'radial-gradient(circle at ' + mouseXpercentage + '% ' + mouseYpercentage + '%, #25368ecc 0%, #010a36 45%)');
  });
  $('.gradient-tracking').mouseleave(function() {
    $(this).css('background', 'linear-gradient(45deg, #010a36, #25368ecc)');
  });
});