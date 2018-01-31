
function filterDiary() {
  var input, filter, diaries, diary, name, i;
  input = document.getElementById('diaryFilter');
  filter = input.value.toUpperCase();
  diaries = document.getElementsByClassName("diaries");
  diary = document.getElementsByClassName('diary');

  for (i = 0; i < diary.length; i++) {
    name = diary[i].getElementsByClassName("name")[0];
    if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
      diary[i].style.display = "";
    } else {
      diary[i].style.display = "none";
    }
  }
}