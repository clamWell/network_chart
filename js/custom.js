$(function(){
	var ieTest = false,
		screenWidth = $(window).width(),
		screenHeight = $(window).height(),
		imgURL = "http://img.khan.co.kr/spko/storytelling/2021/network/",
		isMobile = screenWidth <= 800 && true || false,
		isNotebook = (screenWidth <= 1300 && screenHeight < 750) && true || false,
		isMobileLandscape = ( screenWidth > 400 && screenWidth <= 800 && screenHeight < 450 ) && true || false;
	window.onbeforeunload = function(){ window.scrollTo(0, 0) ;}

	function avoid100vh(){
        $(".fixed-holder").height(screenHeight);
		$(".spacer").height(screenHeight);
		$(".loading-page").height(screenHeight);
		$(".ie-block").height(screenHeight);
	}

	/******** 모바일 전용 조정 ********/
	if(isMobile==true){
		$("body").css({"height":screenHeight});
		$(".going-down span").html("클릭해주세요")
		$(".item--01 .img-layer > img").attr("src", "img/con-photo-00-m.jpg");
		$(".item--02 .img-layer > img").attr("src", "img/con-photo-01-m.jpg");
		$(".item--03 .img-layer > img").attr("src", "img/con-photo-02-m.jpg");
		$(".item--04 .img-layer > img").attr("src", "img/con-photo-03-m.jpg");
		$(".item--06 .img-layer > img").attr("src", "img/con-photo-04-m.jpg");       
		$(".item--07 .img-layer > img").attr("src", "img/con-photo-05-m.jpg");
		$(".item--08 .img-layer > img").attr("src", "img/con-photo-06-m.jpg");
		$(".item--09 .img-layer > img").attr("src", "img/con-photo-07-m.jpg");
		avoid100vh();
	}
	/******** 모바일 전용 조정 ********/

	var randomRange = function(n1, n2) {
		return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
	};
	$(window).resize(function() {
		screenWidth = $(window).width();
		//screenHeight = $(window).height();
		checkIfProgressOverflow(screenWidth )
		//avoid100vh();
    });

	function checkIfProgressOverflow(sw){
		if(sw<1200){
			$(".fixed-navi").stop().animate({"opacity":"0.2", "z-index":"-1"}, 300);

		}else{
			$(".fixed-navi").stop().animate({"opacity":"1","z-index":"1"}, 300);
		}
	}

	var chapter = $("body").attr("id");
	
	$(".close-ie-block").on("click", function(){
		$(".ie-block-9").hide();
	})


    var ieUnder = false;
    function checkIe(){ 
        var word; 
        if (navigator.userAgent.indexOf("MSIE") >= 0) {
            console.log("ieUNDER 10");
            ieUnder = true;
            return true;
        }else {
            return false;
        }
    } 
    checkIe();


	/*								*/
	/*------ vis 네트워크 코드 -----*/
	/*								*/






	
	/*								*/
	/*------ vis 네트워크 코드 -----*/
	/*								*/


	/*********Fised Slider **********/
	var $fs = $(".fs-a");
	function checkNowStage(sc){
		var now = sc;
		if( now <  $fs.eq(0).offset().top ){
			checkStageValue("bf");
		}else if( now >= $fs.eq($fs.length-1).offset().top+$fs.eq($fs.length-1).height()-screenHeight){
			checkStageValue("aft");
		}else{
			for(p=0; p<$fs.length; p++){
				var eachStart = $fs.eq(p).offset().top,
					eachEnd = $fs.eq(p).offset().top+$fs.eq(p).height()-screenHeight;
				if( now >= eachStart && now < eachEnd ){
					var scIndex = 0;
					var paraLength =  $fs.eq(p).find(".spacer").length-1;
					if( now<eachStart+screenHeight){
						scIndex = 1;
					}else if(now>=eachStart+screenHeight*(paraLength-1)){
						scIndex = paraLength; 
					}else{
						for(l=1;l<paraLength-1;l++){ 
							if(  now >= eachStart+screenHeight * (l) && now < eachStart+screenHeight * ( l+1) ){
								scIndex = l+1;
							}
						}
					}

					checkStageValue( Number(p+1)+"-stage-"+scIndex+"-para");
				}else if( now >= eachEnd && now < $fs.eq(p+1).offset().top ){
					checkStageValue(p+"-btw-"+Number(p+1));
				}
			}
		}
	}

	var nowStage = "bf";
	function checkStageValue(s){
		if(nowStage!==s){
			nowStage = s;
			console.log(s);
			adjustStage(s);
		}
	};


	function adjustStage(s){
		if(typeof(s)=="string"){
			if(s=="bf"){
				$fs.find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.find(".fixed-el").removeClass("fixed-el-bottom");

			}else if(s=="aft"){

				$fs.find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.find(".fixed-el").addClass("fixed-el-bottom");

			}else if(s.indexOf("btw")!==-1){
				var ts = s.split("-");

				$fs.eq(ts[0]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[0]).find(".fixed-el").addClass("fixed-el-bottom");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-fixed");
				$fs.eq(ts[2]).find(".fixed-el").removeClass("fixed-el-bottom");


			}else if(s.indexOf("stage")!==-1){
				var ts = s.split("-");

				$fs.eq(ts[0]-1).find(".fixed-el").addClass("fixed-el-fixed");
				$fs.eq(ts[0]-1).find(".fixed-el").removeClass("fixed-el-bottom");
				
				var fi_el_index = (ts[2]*1)-1;
				var $fi_els = $fs.eq(ts[0]-1).find(".slider-item");

				/*
                if(ts[0]-1 == 0 && fi_el_index == 7){
                    $fi_els.eq(6).stop().animate({"opacity":"1"}, 500);
                }else{
                    $fs.eq(ts[0]-1).find(".slider-item:not(:eq("+fi_el_index+"))").stop().animate({"opacity":"0"}, 1000);
                    $fi_els.eq(fi_el_index).stop().animate({"opacity":"1"}, 500);
                }*/
			  $fs.eq(ts[0]-1).find(".slider-item:not(:eq("+fi_el_index+"))").stop().animate({"opacity":"0"}, 1000);
			  $fi_els.eq(fi_el_index).stop().animate({"opacity":"1"}, 500);


			}
		}
	};	

	function settingFixedElOpacity(){
		$(".slider-item").css({"opacity":"0"})
		$(".item--01").css({"opacity":"1"})
	};

	function settingFixedElPos(){
		var $horizon_img = $(".slider-item .vrt-align-center");
		if(isMobile==false){
			$horizon_img.css({"height": 15*33+"px"});
			$horizon_img.each(function(){
				var y = screenHeight*0.5 - $(this).height()*0.5;
				$(this).css({"top": y+"px" });
			})
		}else if(isMobile==true){
			$(".item--01 .img-layer").css({"height": (screenWidth*33/100)+"px"});
			var ym = screenHeight*0.5 - $(".item--01 .img-layer").height()*0.5;
			$(".item--01 .img-layer").css({"top": ym+"px" });
		}
		
	}


	/*********Fised Slider **********/
    

    /******* intro network ********/
    var nodes = null;
    var edges = null;
    var network = null;
    var highlightActive = false;
	var allNodes;

    var nodesDataset = new vis.DataSet(data_confnetwork.node); 
    var edgesDataset = new vis.DataSet(data_confnetwork.edge);
    

    function draw(){
        // Instantiate our network object.
        var container = document.getElementById("CONF_NET");
        var data = {
          nodes: nodesDataset,
          edges: edgesDataset,
        };
        var options = {
          nodes: {
            borderWidth: 7,
			color: {
             // border: "#facc30",
              highlight: {
                background: "#ff7800",
                border: "#111"
              },
              border : "#555",
              background: "#fff"
            },
			font: { color: "#fff" }
          },
		  edges:{
			color: { inherit: "to" },
			smooth: { type: "continuous" },
			width: 1
		  },
		  physics: {
            forceAtlas2Based: {
              gravitationalConstant: -26,
              centralGravity: 0.005,
              springLength: 230,
              springConstant: 0.18,
            },
            maxVelocity: 146,
            solver: "forceAtlas2Based",
            timestep: 0.35,
            stabilization: { iterations: 150 },
          },
          groups:{
            "서울대": { color: "#ddd" },
            "서울대아님": { color: "#ddd"}
          },
          interaction:{
            zoomView: false
          }
        };
       network = new vis.Network(container, data, options);

	   allNodes = nodesDataset.get({ returnType: "Object" });
	   network.on("click", neighbourhoodHighlight);

    }
    function neighbourhoodHighlight(params) {
        // if something is selected:
        if (params.nodes.length > 0) {
          highlightActive = true;
          var i, j;
          var selectedNode = params.nodes[0];
          var degrees = 2;

		//클릭시 return되는 객체 체크
		//console.log(params)

          // mark all nodes as hard to read.
          for (var nodeId in allNodes) {
            allNodes[nodeId].color = "rgba(200,200,200,0.1)";
            if (allNodes[nodeId].hiddenLabel === undefined) {
              allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
              allNodes[nodeId].label = undefined;
            }
			allNodes[nodeId].opacity = undefined;
          }
          var connectedNodes = network.getConnectedNodes(selectedNode);
          var allConnectedNodes = [];

          // get the second degree nodes
          for (i = 1; i < degrees; i++) {
            for (j = 0; j < connectedNodes.length; j++) {
              allConnectedNodes = allConnectedNodes.concat(
                network.getConnectedNodes(connectedNodes[j])
              );
            }
          }

		  console.log(connectedNodes); // 연결되어 있는 노드들의 id값이 리턴됨.


          // all second degree nodes get a different color and their label back
          for (i = 0; i < allConnectedNodes.length; i++) {
            allNodes[allConnectedNodes[i]].color = "rgba(250,204,48,0.5)";
            if (allNodes[allConnectedNodes[i]].hiddenLabel !== undefined) {
              allNodes[allConnectedNodes[i]].label =
              allNodes[allConnectedNodes[i]].hiddenLabel;
              allNodes[allConnectedNodes[i]].hiddenLabel = undefined;
            }
          }

          // all first degree nodes get their own color and their label back
          for (i = 0; i < connectedNodes.length; i++) {
            allNodes[connectedNodes[i]].color = undefined;
            if (allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
              allNodes[connectedNodes[i]].label =
                allNodes[connectedNodes[i]].hiddenLabel;
              allNodes[connectedNodes[i]].hiddenLabel = undefined;
            }
          }

          // the main node gets its own color and its label back.
          allNodes[selectedNode].color = undefined;
          if (allNodes[selectedNode].hiddenLabel !== undefined) {
            allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
            allNodes[selectedNode].hiddenLabel = undefined;
          }
        } else if (highlightActive === true) {
          // reset all nodes
          for (var nodeId in allNodes) {
            allNodes[nodeId].color = undefined;
            if (allNodes[nodeId].hiddenLabel !== undefined) {
              allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
              allNodes[nodeId].hiddenLabel = undefined;
            }
          }
          highlightActive = false;
        }

        // transform the object into an array
        var updateArray = [];
        for (nodeId in allNodes) {
          if (allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(allNodes[nodeId]);
          }
        }
        nodesDataset.update(updateArray);
    }

    /******** intro network ******/

    /********* main network *************/
    var main_nodes = null;
    var main_edges = null;
    var main_network = null;
    var main_highlightActive = false;
	var main_allNodes;

	mainNetworkData.node.forEach(function(v,i,a){
		if(a[i].group <3){ //0,2
			a[i].group = "g0"
		}else if(3<=a[i].group && a[i].group <4){ //3
			a[i].group = "g1"
		}else if(4<=a[i].group && a[i].group <=8){
			a[i].group = "g2"
		}else if(9<=a[i].group && a[i].group<12){
			a[i].group = "g3"
		}else if(12<=a[i].group && a[i].group <16){
			a[i].group = "g4"
		}else if(16<= a[i].group  && a[i].group <17 ){
			a[i].group = "g5"
		}else if(17<= a[i].group  && a[i].group <19 ){
			a[i].group = "g6"
		}else if(19<= a[i].group&& a[i].group <20  ){
			a[i].group = "g7"
		}else if(20<= a[i].group ){
			a[i].group = "g8"
		}
		//a[i].group = "g"+a[i].group;
	})

    var main_nodesDataset = new vis.DataSet(mainNetworkData.node); 
    var main_edgesDataset = new vis.DataSet(mainNetworkData.edge);
    
    function drawMainNetwork(){
        // Instantiate our network object.
        var container = document.getElementById("NET_01");
        var data = {
          nodes: main_nodesDataset,
          edges: main_edgesDataset,
        };
        var options = {
          nodes: {
            borderWidth: 1,
			color: {
              border : "#111",
              background: "#fff"
            },
			shape:"dot",
			font: { color: "#fff", strokeWidth: 3, strokeColor: "#111" }
          },
		  edges:{
		   // color: { color: "rgba(100,100,100,0.3)" },
            color: { inherit: "from", opacity: 0.3 },
			smooth: { type: "continuous" },
			width: 1
		  },
		  physics: {
            forceAtlas2Based: {
              gravitationalConstant: -30,
              centralGravity: 0.005,
              springLength: 230,
              springConstant: 0.18,
            },
            maxVelocity: 50,
            solver: "forceAtlas2Based",
            timestep: 0.01,
           // stabilization: { iterations: 150 },
			   stabilization:true
          },
          groups:{ //0,2,3,6,8,9,10,12,13,14,16,18,19,20
			"g0": { color: "#bcf2e0" },
            "g1": { color: "#05f6ff" },
            "g2": { color: "#c59e59"},
            "g3": { color: "#f1a41f"},
            "g4": { color: "#f16e1f"},
            "g5": { color: "#de3f4e"},
            "g6": { color: "#97c2fc"},
            "g7": { color: "#f6d600"},
            "g8": { color: "#d372db"}
		  }
        };
       main_network = new vis.Network(container, data, options);
	   main_network.stabilize(2000);
	   main_allNodes = main_nodesDataset.get({ returnType: "Object" });
       main_allEdges = main_edgesDataset.get({ returnType: "Object" });
	   main_network.on("click", mainHighlight);

    }


    function mainHighlight(params) {
        // if something is selected:
        if (params.nodes.length > 0) {
          main_highlightActive = true;
          var i, j;
          var selectedNode = params.nodes[0];
          var degrees = 2;
          //console.log(params);
        
          makeTooltip(selectedNode);

          // mark all nodes as hard to read.
          for (var nodeId in main_allNodes) {
            //main_allNodes[nodeId].color = "rgba(128,128,128,0.05)";
            if (main_allNodes[nodeId].hiddenLabel === undefined) {
              main_allNodes[nodeId].hiddenLabel = main_allNodes[nodeId].label;
              main_allNodes[nodeId].label = undefined;
            }
			main_allNodes[nodeId].opacity = 0.05;
          }
          
          //console.log(main_allEdges)
         
          for(var n in main_allEdges){
                //console.log(main_allEdges[n]);
                //main_allEdges[n].color = "rgba(100,100,100,0.05)"
				main_allEdges[n].color = { inherit: "from", opacity: 0.05 };
 
          }
          var selectEdgeArr = params.edges;
          
         for (s = 0; s < selectEdgeArr.length; s++) {
            //main_allEdges[selectEdgeArr[s]].color = "rgba(100,100,100,0.7)"
			main_allEdges[selectEdgeArr[s]].color = { inherit: "from", opacity: 0.7 };
         }


          var connectedNodes = main_network.getConnectedNodes(selectedNode);
           //console.log(connectedNodes); // 연결되어 있는 노드들의 id값이 리턴됨.


          // all first degree nodes get their own color and their label back
          for (i = 0; i < connectedNodes.length; i++) {
            main_allNodes[connectedNodes[i]].color = undefined;
            if ( main_allNodes[connectedNodes[i]].hiddenLabel !== undefined) {
              main_allNodes[connectedNodes[i]].label =
                main_allNodes[connectedNodes[i]].hiddenLabel;
              main_allNodes[connectedNodes[i]].hiddenLabel = undefined;
            }
            main_allNodes[connectedNodes[i]].opacity = 1;
          }


          if ( main_allNodes[selectedNode].hiddenLabel !== undefined) {
            main_allNodes[selectedNode].label = main_allNodes[selectedNode].hiddenLabel;
            main_allNodes[selectedNode].hiddenLabel = undefined;
            
          }
          main_allNodes[selectedNode].opacity = 1;
        } else if (main_highlightActive === true) { // reset

            for (var nodeId in main_allNodes) {
                main_allNodes[nodeId].color = undefined;
                if ( main_allNodes[nodeId].hiddenLabel !== undefined) {
                  main_allNodes[nodeId].label = main_allNodes[nodeId].hiddenLabel;
                  main_allNodes[nodeId].hiddenLabel = undefined;
                }
                main_allNodes[nodeId].opacity = undefined;
            }

            for(var n in main_allEdges){
                main_allEdges[n].color = { inherit: "from", opacity: 0.3 };
            }
            main_highlightActive = false;
            hideTooltip();
        }

        // transform the object into an array
        var updateArray = [];
        for (nodeId in main_allNodes) {
          if ( main_allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(main_allNodes[nodeId]);
          }
        }
        main_nodesDataset.update(updateArray);

        var updateEdgeArray = [];
        for (edgeId in main_allEdges) {
          if ( main_allEdges.hasOwnProperty(edgeId)) {
            updateEdgeArray.push(main_allEdges[edgeId]);
          }
        }
        main_edgesDataset.update(updateEdgeArray);
    }

    function makeTooltip(id){ // 툴팁 생성
        var selectNodeData;
        finalPersonData.forEach(function(v,i,a){
			if(a[i].id == id){
				selectNodeData = a[i]
			}
        });
        //console.log(selectNodeData);
		if(selectNodeData.thumb == true){
			$(".tooltip .tooltip-wrap .col-2 .thumbs img").attr("src", "img/tool-thumb-"+selectNodeData.id+".jpg");
		}else{
			$(".tooltip .tooltip-wrap .col-2 .thumbs img").attr("src", "img/img_thumb_human_profile.jpg");
		}
        if(selectNodeData.name.match(/\d+/g) == null){
             $(".tooltip .info ul li span.name").html( selectNodeData.name);
        }else{
            var nameStr = selectNodeData.name.slice(0, -1);
            $(".tooltip .info ul li span.name").html( nameStr );    
        }
        
		
		var posStr = "";
		selectNodeData.offcie.forEach(function(v,i,a){
			posStr = posStr + "<em class='div'>I</em>"+ a[i]
		})
		$(".tooltip .info ul li span.position_now").html( posStr );

		if(selectNodeData.vch1!=="확인불가"){
			$(".tooltip .info ul li.row-bach").show();
			if(selectNodeData.vch2!=="0"){
				$(".tooltip .info ul li span.bachelor").html( selectNodeData.vch1 +" "+selectNodeData.vch2 );
			}else{
				$(".tooltip .info ul li span.bachelor").html( selectNodeData.vch1);
			}
		}else{
			$(".tooltip .info ul li span.bachelor").html("");
			$(".tooltip .info ul li.row-bach").hide();
		}

		if(selectNodeData.doc1!=="확인불가"){
			$(".tooltip .info ul li.row-doc").show();
			if(selectNodeData.doc2!=="0"){
				$(".tooltip .info ul li span.doctor").html( selectNodeData.doc1 +" "+selectNodeData.doc2 );
			}else{
				$(".tooltip .info ul li span.doctor").html( selectNodeData.doc1);
			}
		}else{
			$(".tooltip .info ul li span.doctor").html("");
			$(".tooltip .info ul li.row-doc").hide();
		}

		var schStr = "";
		if(selectNodeData.sch !== "없음"){
			schStr = schStr + selectNodeData.sch
		}
		if(selectNodeData.sch2 !== "없음"){
			schStr = schStr + " " +selectNodeData.sch2
		}
		if(selectNodeData.sch3 !== "없음"){
			schStr = schStr + " " +selectNodeData.sch3
		}
		//console.log(schStr);

		if(schStr.length > 0 ){
			$(".tooltip .info ul li.row-sch").show();
			$(".tooltip .info ul li span.sch").html(schStr);
		}else{
			$(".tooltip .info ul li span.sch").html("");
			$(".tooltip .info ul li.row-sch").hide();
		}

		if(selectNodeData.camp=="O"){
			$(".tooltip .info ul li.row-camp").show();
			$(".tooltip .info ul li span.camp").html("참여함");
		}else{
			$(".tooltip .info ul i.row-camp").hide();
			$(".tooltip .info ul li span.camp").html("참여하지 않음");
		}
        $(".tooltip").show();
    }
    function hideTooltip(){
        $(".tooltip").hide();   
    }
	$(".tooltip-close").on("click", function(){
		hideTooltip();
	});

    hideTooltip();
    /********* main network *************/

    function makeCrawPersonList(){
        var $listBody = $(".craw-person-list");
        $listBody.html("");
        crawPersonList.forEach(function(v,i,a){
            var _temp = "<li><span class='name'>"+ a[i].name+"</span>"; 
            if(a[i].position1 !== null){
                _temp += "<span class='position'>" +a[i].position1+"</span>"
            }
            if(a[i].position2 !== null){
                _temp += "<span class='position'>(전)" +a[i].position2+"</span>"
            }
            $listBody.append(_temp);
        })
    }
    makeCrawPersonList();
    $(".list-toggle-area").hide();
    var isPlistOpen = false;
    $("#TOGGLE_LIST").on("click", function(){
        if(isPlistOpen==false){
            $(".list-toggle-area").slideDown("swing");
            $(this).addClass("on");
            $(this).html("목록 닫기")
            isPlistOpen = true;        
        }else{
            $(".list-toggle-area").hide();
             $(this).removeClass("on");
            $(this).html("대상 인물 70명 모두 보기")
            isPlistOpen = false;        
        }
    })

     
    var isDescOpen = false;
    $(".imp-desc-toggle-area").hide();
    $("#TOGGLE_LIST_2").on("click", function(){
        if(isDescOpen==false){
            $(".imp-desc-toggle-area").slideDown("swing");
            $(this).addClass("on");
            $(this).html("설명 닫기")
            isDescOpen = true;        
        }else{
            $(".imp-desc-toggle-area").hide();
             $(this).removeClass("on");
            $(this).html("네트워크차트에서 중요도 지표란?")
            isDescOpen = false;        
        }
    })


    /*네트워크 필터링 버튼 영역*/
    $(".network-group-btn-holder ul li").on("click", function(){
        if( $(this).attr("data-btn") == "default"){
             $(".network-group-btn-holder ul li").removeClass("on");
             makeNodeDefault();
        }else{
            if( $(this).hasClass("on") ){
                $(this).removeClass("on");
                makeNodeDefault();
            }else{
                $(".network-group-btn-holder ul li").removeClass("on");
                $(this).addClass("on");
                var _gi = $(this).attr("data-btn"); 
                highlightByGroup(_gi);
            }

        }
        
   
    });

    function makeNodeDefault(){
		for (var nodeId in main_allNodes) {
            main_allNodes[nodeId].color = undefined; 
            if (main_allNodes[nodeId].hiddenLabel !== undefined) {
				main_allNodes[nodeId].label = main_allNodes[nodeId].hiddenLabel;
				main_allNodes[nodeId].hiddenLabel = undefined;
            }
			main_allNodes[nodeId].opacity =  undefined;
        }

        for(var n in main_allEdges){
            main_allEdges[n].color = { inherit: "from", opacity: 0.3 };
        }

		// 변경된 node 정보를 update해줌 
        var updateArray = [];
        for (nodeId in main_allNodes) {
          if (main_allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(main_allNodes[nodeId]);
          }
        }
        main_nodesDataset.update(updateArray);

        var updateEdgeArray = [];
        for (edgeId in main_allEdges) {
          if ( main_allEdges.hasOwnProperty(edgeId)) {
            updateEdgeArray.push(main_allEdges[edgeId]);
          }
        }
        main_edgesDataset.update(updateEdgeArray);

		console.log("초기화")
	};

    function highlightByGroup(ti){
		var highLightNodeArr = [];
		var ti = ti || "tag1";

		mainNetworkData.node.forEach(function(v,i,a){
			if( a[i].tagArr !== null && a[i].tagArr !== undefined ){
				var tagArr = a[i].tagArr.split(" ");
				if( tagArr.includes(ti) ){
					highLightNodeArr.push(a[i].id);
				}
			}
		});

		//console.log(highLightNodeArr);

        // mark all nodes as hard to read.
        for (var nodeId in main_allNodes) {
            //main_allNodes[nodeId].color = "rgba(128,128,128,0.05)";
            if (main_allNodes[nodeId].hiddenLabel === undefined) {
              main_allNodes[nodeId].hiddenLabel = main_allNodes[nodeId].label;
              main_allNodes[nodeId].label = undefined;
            }
            main_allNodes[nodeId].opacity = 0.05;
        }

        //하이라이팅 시키고 싶은 node arr 애들만 하이라이트
		for (i = 0; i < highLightNodeArr.length; i++) {
			//console.log( main_allNodes[highLightNodeArr[i]].label );
			main_allNodes[highLightNodeArr[i]].color = undefined;
			if (main_allNodes[highLightNodeArr[i]].hiddenLabel !== undefined) {
				main_allNodes[highLightNodeArr[i]].label =
				main_allNodes[highLightNodeArr[i]].hiddenLabel;
				main_allNodes[highLightNodeArr[i]].hiddenLabel = undefined;
			}
			main_allNodes[highLightNodeArr[i]].opacity = 1;
		}

        var connectedEdge = [];
        // to from 모두 on 되어 있는 edge 만 활성화 되도록..
        for(var n in main_allEdges){

           // main_allEdges[n].color = "rgba(100,100,100,0.05)"
		    main_allEdges[n].color = { inherit: "from", opacity: 0.05 };
            //console.log(main_allEdges[n]);
            if( highLightNodeArr.includes(main_allEdges[n].from)==true && highLightNodeArr.includes(main_allEdges[n].to)==true){
                //main_allEdges[n].color = "rgba(100,100,100,0.7)"
				main_allEdges[n].color = { inherit: "from", opacity: 0.7 };
            }
        }
        //var selectEdgeArr = params.edges;
        
		
		//하이라이팅 된 정보값 업데이트
        var updateArray = [];
        for (nodeId in main_allNodes) {
          if ( main_allNodes.hasOwnProperty(nodeId)) {
            updateArray.push(main_allNodes[nodeId]);
          }
        }
        main_nodesDataset.update(updateArray);

        var updateEdgeArray = [];
        for (edgeId in main_allEdges) {
          if ( main_allEdges.hasOwnProperty(edgeId)) {
            updateEdgeArray.push(main_allEdges[edgeId]);
          }
        }
        main_edgesDataset.update(updateEdgeArray);

	};	


	finalPersonData.forEach(function(v,i,a){
		//console.log(a[i].name);
		var tagStr = "";
		var posArr = a[i].offcie;

		if(a[i].offcie !== undefined && a[i].offcie.length>0){
			for(d=0; d<posArr.length;d++){
				if( posArr[d].includes("위원회") || posArr[d].includes("자문위원") ){
					tagStr += "tag1";
					break;
				}
			}
			for(d=0; d<posArr.length;d++){
				if( posArr[d].includes("청와대") || posArr[d].includes("비서관") || posArr[d].includes("보좌관" | posArr[d].includes("비서실"))){
					tagStr += " tag3";
					break;
				}
			}
		}
	
		if( a[i].vch1 == "서울대" && a[i].vch2 == "경제학"){
			tagStr += " tag2";
		}
		if(a[i].camp == "O"){
			tagStr += " tag4";
		}

		

		if(tagStr.length<2){
			//console.log("해당없음");
			//a[i].tagArr = null;
		}else{
			for(l=0; l<mainNetworkData.node.length;l++){
				if(mainNetworkData.node[l].id == a[i].id){
					mainNetworkData.node[l].tagArr = tagStr;
					break;
				}
			}
			//a[i].tagArr = tagStr;
		}
		
	});

	//console.log(mainNetworkData.node);
	
	//console.log(finalPersonData);

    /*네트워크 필터링 버튼 영역*/

	/*  객체를 받아서 json 형태로 병합
	personData2.forEach(function(v,i,a){
		for(var n in personData){
			if(personData2[i].name == personData[n].name){
				personData2[i].offcie = personData[n].office;
			
			}
        }
	})
	var myJsonString = JSON.stringify(personData2);
	console.log(myJsonString);*/



    $(".first-network-holder").css({"height": ((isMobile)? screenHeight*0.65 : screenHeight*0.75)+"px"});
	$(".first-network-holder .introduction").on("click", function(){
		$(this).fadeOut();
	});



	function init(){
		if(chapter=="ch1"){
			settingFixedElOpacity();
			settingFixedElPos();
			draw();
			drawMainNetwork();
		}

	};
    init();

	function ableBodyScroll(){
		$("body").removeClass("fixed");
		$("body").css({"height":"inherit"});
		$(".fixed-slider-cover").hide();
		$(".fixed-graphic").removeClass("blur");
		isStart = true; 
		$("html, body").stop().animate({scrollTop: screenHeight*0.4}, 1000);
	}

	$(".loading-page").fadeOut(1000, function(){	
		if(isMobile){
			$(".going-down").on("click", function(e){
				ableBodyScroll();
			})
			if(chapter !== "ch1"){
				$("body").removeClass("fixed");
				$("body").css({"height":"inherit"});
			}
		}else{
			$("body").removeClass("fixed");
		}
		
	});

	var isStart = false; 
	var fullScroll = $(document).height()-$(window).height()-( $(".footer-area").height()+$(".digital-list").height());	
	$(window).scroll(function(){
		var nowScroll = $(window).scrollTop();

		if($fs.length >= 1){
			checkNowStage(nowScroll);
		}

		if(chapter=="ch1" && isMobile==false){
			if( nowScroll> 10 && isStart == false) {
				$(".fixed-slider-cover").hide();
				$(".fixed-graphic").removeClass("blur");
				isStart = true; 
			}else if( nowScroll<= 10 &&isStart == true){
				$(".fixed-slider-cover").fadeIn();
				$(".fixed-graphic").addClass("blur");
				isStart = false;
			}
		}
		
		$(".hideme").each(function(i){
			if( $(this).hasClass("shown") == false && nowScroll + screenHeight > $(this).offset().top + $(this).outerHeight()*0.5 ){
				$(this).addClass("shown")
				$(this).stop().animate({"opacity":1},1000);
			}
		});

	});

	
	$(".hidden-ment-list .person-ment-col .person").on("click", function(){
		if($(this).hasClass("person-after")){
		}else{
			$(this).addClass("person-after");
			//$(this).find(".hidden").find("img").css({"":""})
			$(this).find(".hidden-off").stop().animate({"height":"100%"}, 1000,"easeOutCirc");
			$(this).find(".name").fadeIn();
		}
	});


});


function sendSns(s) {
  var url = encodeURIComponent(location.href),
	  txt = encodeURIComponent($("title").html());
  switch (s) {
    case 'facebook':
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
      break;
    case 'twitter':
      window.open('http://twitter.com/intent/tweet?text=' + txt + '&url=' + url);
      break;
  }
}
