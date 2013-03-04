document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#start').addEventListener('click', countdown_init);
  document.querySelector('#stop').addEventListener('click', countdown_clear);
  document.querySelector('#reset_time').addEventListener('click', countdown_reset);
  document.querySelector('#reset_goal').addEventListener('click', goal_reset);
  document.querySelector('#pick_goal').addEventListener('click', pick_goal);
  document.querySelector('#goal_entered').addEventListener('click',set_goals);
 document.querySelector('#daily_time_check').addEventListener('click',check_daily_time);
  //document.querySelector('#store').addEventListener('click', store);

});


// Begin of Time Counter Functions
// local[1]=time
// local[2]=goal
// local[3]=current_day
// local[4]=daily_seconds
// local[5]=daily_minutes
// local[6]=daily_hours

var countdown_number=10000*3600;
var days;
var hours;
var minutes;
var seconds;
var countdown;
var goal="";
var current_date = 1;
var has_date_changed;


var daily_seconds=0;
var daily_minutes=0;
var daily_hours=0;

document.onload = load_data();

function load_data(){
    load_goal();
    get_and_check_current_day();
    ltime();
}

function ltime(){
    console.log("Its here");
    daily_seconds = window.localStorage.getItem(4);
    daily_minutes = window.localStorage.getItem(5);
    daily_hours = window.localStorage.getItem(6);
}

function check_daily_time(e){
    //$('<div id="daily_seconds">_</div>').appendTo('#daily_time');
    //$('<div id="daily_minutes">_</div>').appendTo('#daily_time');
    //$('<div id="daily_hours">_</div>').appendTo('#daily_time');
    document.getElementById('daily_seconds').innerHTML=daily_seconds;
    console.log(daily_seconds)
    document.getElementById('daily_minutes').innerHTML=daily_minutes;
    document.getElementById('daily_hours').innerHTML=daily_hours;
}

function countdown_init(e) {

    countdown_start();
    $('<div id="days">Days</div>').appendTo('#time_labels');
    $('<div id="hours">Hours</div>').appendTo('#time_labels');
    $('<div id="minutes">Minutes</div>').appendTo('#time_labels');
    $('<div id="seconds">Seconds</div>').appendTo('#time_labels');

}

function update_dailytime(){
    window.localStorage.setItem(4, daily_seconds);
    window.localStorage.setItem(5, daily_minutes);
    window.localStorage.setItem(6, daily_hours);
    console.log("Updates")
}


function countdown_start() {
    get_countdown_number(1);
    get_and_check_current_day();
    countdown_trigger();
}

function get_and_check_current_day(){
    var d = new Date();
    current_date = d.getDate();
    var old_date = window.localStorage.getItem(3)
    if(old_date!=current_date){
        daily_seconds=0;
        daily_minutes=0;
        daily_hours=0;
        window.localStorage.setItem(3, current_date)
    }
}

function countdown_trigger() {
    if(countdown_number > 0) {
        countdown_number--;
        daily_seconds++;
        if(daily_seconds%60==0){
            daily_seconds=0
            daily_minutes++;
        }
        //count2_seconds++;
        days = Math.floor(countdown_number/(3600*24));
        hours = (Math.floor(countdown_number/(3600))-days*24) % 24;
        minutes = (Math.floor(countdown_number/(60))-hours*60) % 60;
        seconds = (Math.floor(countdown_number)-minutes*60) % 60;
        update_counter();
        update_dailytime();
        if(countdown_number > 0) {
            countdown = setTimeout(countdown_start, 1000);
        }
    }
}

function update_counter(){
	writeItem();
    days_=days;
    hours_=hours;
    minutes_=minutes;
    seconds_=seconds;
    if(days<10){
        days_ = "0" + days;
    }
    if(hours<10){
        hours_ = "0" + hours;
    }
    if(minutes<10){
        minutes_ = "0" + minutes;
    }
    if(seconds<10){
        seconds_ = "0" + seconds;
    }
     document.getElementById('time_numbers').innerHTML = days_ + " | " + hours_ + " | " + minutes_ + " | " + seconds_;
}

function countdown_clear(e) {
    clearTimeout(countdown);
}

function countdown_reset(e){
    countdown_number=10000*3600;
    update_counter();
    clearTimeout(countdown);
}

function goal_reset(e){
    goal="";
    window.localStorage.setItem(2,goal);
    console.log(goal);
}

function writeItem(){
	window.localStorage.setItem(1, countdown_number)
    //localStorage[1] = countdown_number;
    //document.getElementById('item').innerHTML = "Changed";
}

function get_countdown_number(key) {
    countdown_number = window.localStorage.getItem(key);
   // $('#item').html(count2_seconds);
    //document.getElementById('item').innerHTML=countdown_number;
  }


function get_goal(key){
  goal = window.localStorage.getItem(key);
}

function store(e){
    writeItem();
}
// Begin Goal Functions


function load_goal(){
get_goal(2);

if(goal.length=0){
    $('#goal').html("Pick a goal");
}else{
    console.log(goal)
    $('#goal').html("My goal is: " + goal);
}
}

function pick_goal(){
    $('#goal_button').show();
    //var hello = document.forms['goal_button'].elements['goal_button'];
    //alert(hello);
}

function set_goals(e){
    if(document.goal_submit.goal.value==""){
        console.log("Break");
        return false;
    }
    goal = document.goal_submit.goal.value;
    window.localStorage.setItem(2, goal);
    $('#goal').html("My goal is: "+goal);
    return true;

}

function goal_entered(){
   // alert("Goal Entered");
}