$(function() {
  var start = false;


  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }

  if(!("client_id" in vars) || !("access_token" in vars)) {
    alert("You must specify your 'client_id' and 'access_token' as a query string");
  }

  var gate;
  if(("gate" in vars) && vars["gate"]!="") {
      gate = decodeURIComponent(vars["gate"]);
  } else {
      gate = "https://gate.angus.ai";
  }

  $("#camera").liveSceneAnalysis("init", {
    "client_id": vars["client_id"],
    "access_token": vars["access_token"],
    "gate": gate,
    "ready_callback": function() {
      $("#startBtn").click(function() {
        $("#camera").liveSceneAnalysis("start");
      });
      $("#stopBtn").click(function() {
        $("#camera").liveSceneAnalysis("stop");
      });
    }
  });

  $(".albumpic").click(function() {
    var tgt  = $(this);
    var groups = tgt.attr('id').match(/p(.)s(.)/);
    var people = groups[1];
    var pic = groups[2];

    $("#camera").liveSceneAnalysis("snapshot", {
      id: "People"+people,
      pic: parseInt(pic)-1,
      target: function(dataUrl) {
        tgt.attr("src", dataUrl);
      }
    });
  });



});
