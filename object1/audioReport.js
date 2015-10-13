var finalTable="";
$(window).load(function() {	
	
	audioReport();
	
	$("#content_objects_table_wrapper").css("min-height", "0px");

	$("#content_objects_table_filter").prepend(
			$("<span></span>").attr({
				"class": "ui-icon-search-object"
			}).css({
				"float": "left",
				"position": "relative",
				"top": "1px",
				"left": "-5px"
			})
	).css({width: "auto"});
	$("#back").button({
		icons: {"primary": "ui-icon-back-arrow"},
		label: BACK_LABEL
	}).click(function() {
		window.location.href = GET_BACK_URL();
	});
	// clear the tooltip and highlight
});

// Function Called for Generating the AudioReport.
/**
 * This function reads the Sco.json.
 * Parses the sco.json
 *  
 */
function audioReport(){
	
	$.ajax({
		url: GET_AUDIO({"id":DATAID,"path":PATH}),
		dataType: "text",
		error:function(errorStatus) {
			if((errorStatus.status==200)||(errorStatus.status>=300)){
				//pleaseWait.dialog("close");				
			}
		},
		success: function(TABLE_DATA) {
			var sections =parseJSONSCO(TABLE_DATA);
			var len=sections.length;
			
			var nam = []; 
			for(var i=0;i<len;i++)
				{
				obj=sections[i];
				nam[i]=obj.sectionName;
				
				report(nam[i],i,len)
				}
			$("#loadingHome").hide();	
		}});
}


/**
 * Parses the Json file -Sco.json
 * And returns the section present in them.
 */
function parseJSONSCO(str){

	var json = $.parseJSON(str);
	var sections = json.sections;
	return sections;
}



/**
 * This function reads the sections available in Sco.json.
 * Parses the sections in sco.json. i.e. section.json,headerSection.json...
 * And Generates the Audio Report for those Sections.
 *  
 */
function report(name,i,len){
	
	var FILE_NAME=name;
	len=len-1;
	
	var tableData="";

	$.ajax({
		url: GET_AUDIO_URL({"id":DATAID,"path":PATH,"file_name":FILE_NAME}),
		dataType: "text",
		async: false,
		error:function(errorStatus) {
			if((errorStatus.status==200)||(errorStatus.status>=300)){
				//pleaseWait.dialog("close");				
			}
		},
		success: function(TABLE_DATA) {
			
		tableData=parseJSON(TABLE_DATA,FILE_NAME);
			if(len==i)
			{
				finalTable=finalTable+tableData;
				var op = document.getElementById('output');
				op.innerHTML = finalTable;
				selectElementContents(op);
			}
			else
			{
				finalTable=finalTable+tableData;
			}
		}});
	
}

/**
 * ---------------------------START------------------------
 * The prototype of the code was provided in JIRA.
 * This function parses the Json files and Generates Audio Report.
 * 
 * Changes has been made to fit in.
 */
function parseJSON(str,FILE_NAME){
	
	FILE_NAME=FILE_NAME.toUpperCase()
	var json = $.parseJSON(str);
	var pages = json.pages;
	var tableStr='<table><tr><td><h3>'+FILE_NAME+'</h3></td></tr></table>';
	tableStr += '<table border="1"> <col width="200"><col width="900"><col width="150"><tr><th>File Name</th><th>Audio Script</th><th>Script Notes</th></tr>';
	var prefix =DATAID+ '_' || ''; 
	var len = pages.length, i=0, pageStr, obj,gadgets,g,glen,gad,val,subprop,s,slen,sval,sobj; 
	for(i=0;i<len;i++){ 
	obj = pages[i]; 
	gadgets = obj.gadgets; 
	if(!gadgets) continue; 
	pageStr = prefix + getTwoDigitString(i+1) + '_'; 
	glen = 0; 
	for(g in gadgets){ 
			gad = gadgets[g]; 
			val = getValueStr(gad); 
			if(!val) 
				continue; 
			tableStr += '<tr>' + '<td>'+ pageStr + getTwoDigitString(glen++) + gad.class + '</td><td>' + val + '</td><td></td></tr>'; 
			switch(gad.class)
			{
				case 'Gallery': 
					subprop = 'images'; 
					break; 
				case 'MultipleChoice': 
					subprop = 'options'; 
					break; 
				case 'FillBlank':
					subprop= 'feedback';
					break;
				default: 
					subprop = null; 
			} 
			if(subprop && gad[subprop]) 
			{ 
				slen = gad[subprop].length; 
				for(s=0;s<slen;s++)
				{ 
					sobj = gad[subprop][s]; 
					sval = getValueStr(sobj); 
					if(!sval) continue; 
					tableStr += '<tr>' + '<td>'+ pageStr + getTwoDigitString(glen++) + gad.class +'-'+subprop.slice(0,-1)+ '</td><td>' + sval + '</td><td></td></tr>'; 
				} 
			} 
			
	} 
	} 
	
	tableStr += '</table>'; 
	
	
return tableStr;
}

function getTwoDigitString(n) { return (n*.01).toFixed(2).split('.').pop(); }
function getValueStr(obj){
	if(obj.value) return obj.value;
	var p, val, type;
	for(p in obj) {
		if(typeof obj[p] === 'object'){
			val = getValueStr(obj[p]);
			if(val) return val;
		}
	}
	return null
}

function selectElementContents(el) {
    if (window.getSelection && document.createRange) {
        var sel = window.getSelection();
        var range = document.createRange();
        //range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (document.selection && document.body.createTextRange) {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
    }
    return el;
}
/**
 * ----------------------End-----------------------
 *  
 */