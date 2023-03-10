/*
/ Doxa en hypsistois Theo, kai epi ges eirene, en anthropois eudokia.
*/

//===================================================================
//Standard constants


var TristateFalse = 0
var TristateMixed = -2
var TristateTrue = -1
var TristateUseDefault = -2
	
var WshFinished = 1
var WshFailed = 2

var ForReading = 1, ForWriting = 2, ForAppending = 8

var BIF_NEWDIALOGSTYLE =0x00000040

var BIF_RETURNONLYFSDIRS   = 0x0001 
var BIF_DONTGOBELOWDOMAIN  = 0x0002
var BIF_STATUSTEXT         = 0x0004
var BIF_RETURNFSANCESTORS  = 0x0008
var BIF_EDITBOX            = 0x0010
var BIF_VALIDATE           = 0x0020
var BIF_NONEWFOLDER        = 0x0200
var BIF_BROWSEFORCOMPUTER  = 0x1000
var BIF_BROWSEFORPRINTER   = 0x2000
var BIF_BROWSEINCLUDEFILES = 0x4000
//These can be combined e.g. BIF_EDITBOX + BIF_NONEWFOLDER

//StartPath     A drive/folder path or one of the following numeric constants: 
var DESKTOP = 0
var PROGRAMS = 2
var DRIVES = 17
var NETWORK = 18
var NETHOOD = 19
var PROGRAMFILES = 38
var PROGRAMFILESx86 = 48
var WINDOWS = 36


var illicitFilenameChars = '/\\*?"<>|:'

//============================================================

/*
'=================================================
'= Upload
'=================================================
*/
//Build multipart/form-data document with file contents And header info
function BuildFormData(content)
{
	/*
	Dim Pre, Po
	Const ContentType = "application/octet-stream"	
	
	Set file=content("file")
	fileContents=ReadFile(file)
	if IsNull(fileContents) then
		BuildFormData=null
		exit function
	end if
		
	'The two parts around file contents In the multipart-form data.
	
	'Build source form with file contents
	d = "--" + MPFDBoundary + vbCrLf
	
	For Each param In content
		If Not(IsObject(content(param))) then
			d = d + "Content-Disposition: form-data; name=""" & param & """" & vbCrLf & vbCrLf
			d = d + content(param) + vbCrLf + "--" + MPFDBoundary + vbCrLf
		End If
	Next
	
	fileName = fso.GetFileName(file.path)
	d = d + "Content-Disposition: form-data; name=""file""; filename=""" & fileName &  """" +vbcrlf
	d = d + "Content-Type: " + ContentType + vbCrLf + vbCrLf
	'd=d+"Content-Length: " +  + vbCrLf + vbCrLf
	
	Pre = d
	Po=vbCrLf + "--" + MPFDBoundary + "--" & vbCrLf
	
	'Build form data using streams.

	Set stream2 = CreateObject("adodb.stream")
	stream2.Open
	stream2.Type= adTypeBinary
	
	With oStream
		.Open
		.Type = adTypeText
		.Charset = "utf-8"
		.WriteText Pre
		.Position=3
		.CopyTo stream2
				
		stream2.Write fileContents
		
		.Position=0
		.WriteText Po
		.SetEOS
		.Position=3
		.CopyTo stream2
	
		.position=0
		.seteos
		.Close
	End With
	
	stream2.Position=0
	BuildFormData = stream2.Read
	
	stream2.Position=0	
	stream2.SetEOS
	stream2.Close
	
	Set stream2=nothing
	
*/
}

//============================================================

//var desktopPath= wShell.SpecialFolders("Desktop")
//var downloadsPath = fso.BuildPath(fso.GetParentFolderName(desktopPath), "Downloads")
var IncludesPaths=["..\\includes", "includes"];
var settingsFile="settings.inc";

var scriptPath, scriptFile


	strHtmlLoc = document.location.href 
	//scriptPath = URIToWindows(fso.GetParentFolderName(strHtmlLoc))
	
	//wShell.CurrentDirectory=scriptPath
	


//============================================================

function Includes(paths)
{
	for(i in paths) {
		var path=paths[i];
		if (fso.FolderExists(path)) {
			var files = fso.getfolder(path).Files;
			for(objEnum = new Enumerator(files); !objEnum.atEnd(); objEnum.moveNext()) {
				inc=objEnum.item();
				if (fso.GetFileName(inc)=="include.js") continue;
				
				if (fso.GetExtensionName(inc).match(/^js$|^vbs$|^inc$/)) Include(inc.Path);
			}
		}
	}
}

function Include(inc) {
	if (fso.GetExtensionName(inc)=="js") {lang="javascript";} else {lang="vbscript";}
		 
 	document.head.appendChild (CreateHTMLElement("script", "language",
		lang, "src", inc)); 
}

function URIToWindows(htmlPath){
	return htmlPath.replace(/^file:\/\/\//, '').replace(/\%20/g, ' ').replace(/\//g, '\\');
	
	
	var parser = document.createElement('a');
	
	parser.href = "http://example.com:3000/pathname/?search=test#hash";
	
	
	parser.protocol; // => "http:"
	
	parser.hostname; // => "example.com"
	
	parser.port;     // => "3000"
	
	parser.pathname; // => "/pathname/"
	
	parser.search;   // => "?search=test"
	
	parser.hash;     // => "#hash"
	
	parser.host;     // => "example.com:3000"	
}



/*
// parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = m[i] || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};
*/

function ForEach(item, callback)
{
	for(var objEnum= new Enumerator(item); !objEnum.atEnd(); objEnum.moveNext())
		callback(objEnum.item())
}

/* ensures the length, removes the illicit characters */
function MakeFileName(fileName){
	if (fileName.length>150) fileName=fileName.substring(0,150);
		
	illicitFilenameChars.match(/./g).forEach(function (chr) {
		fileName= fileName.split(chr).join('')		
	});
	
	fileName=fileName.trim()
	
	if (!fileName.length) throw("MakeFileName: no characters in file name");
	return fileName;
}

function ReadUTF8File(path)
{
	var s = new ActiveXObject("adodb.stream");
	s.Type = adTypeText;
	s.Charset="UTF-8";
	s.Open();
	s.LoadFromFile (path);
	text = s.ReadText();
	s.Close();
	return text;
}

function WriteUTF8File(path, contents)
{
	var s = new ActiveXObject("adodb.stream");
	s.Type = adTypeText;
	s.Charset="UTF-8";
	s.Open();
	s.WriteText(contents);
	s.SaveToFile(path, adSaveCreateOverWrite);
	s.Close();
}



function recordset2json(rs)
{
	var js=[];

	if (rs.BOF)
		return {};
	
	rs.MoveFirst;
	while (!rs.EOF)
	{	
		var rec={};
		var e=new Enumerator(rs.Fields);
		for (;!e.atEnd();e.moveNext())         
      	{
      		field=e.item();
			rec[field.Name]=String(field.Value).trim();
		}
		
		js.push(rec);
		rs.MoveNext
	}
		
	return js;
}


//If typeof arg not string - problem.

function CreateHTMLElement(tag) {
	var args = Array.prototype.slice.call(arguments, 1);
  	
	var el=document.createElement (tag);
	var attr='';

	//echo(tag, args.join(' '));  	

	for (arg in args) {
		//echo ("Iteratio", arg);
		arg=args[arg];
		if (typeof arg == "undefined") continue;
		else if (Array.isArray(arg))
			arg.forEach(function(child) {el.appendChild(child);});
		
		else if (typeof arg == "object") 
			el.appendChild (arg);
		
		else if(attr.length) {
			el.setAttribute(attr, arg);
			attr='';	
		} else
			attr=arg;
		
	}
	if (attr.length) el.innerHTML=attr;

	return el;
}

function htmla(addr){
	return CreateHTMLElement("a", "href", addr)
}

function Sleep(ms)
{
	ms += new Date().getTime();
	while (new Date() < ms){}
 
}

function echo () {
	var text;
	var args = Array.prototype.slice.call(arguments, 0);
  	text = args.join(' ');
  	
  	var p=document.createElement ('p');
  	p.innerText = text;
  	p.style.width="100%"
  	p.style.overflow ="visible";

	if (document.body) {
		document.body.appendChild (p);
		window.scrollTo (0, document.body.scrollHeight);
	} //else
	//	alert ("Document body not yet available. Message: " + text);

}

function echohtml(code) {
	var text;
	var args = Array.prototype.slice.call(arguments, 0);
  	text = args.join(' ');
  	
  	var p=document.createElement ('span');
  	p.innerHTML = text;
  	p.style.width="100%"
  	p.style.overflow ="visible";
	document.body.appendChild (p);

	window.scrollTo (0, document.body.scrollHeight);
}

function WriteFile(fileName, text){
	var f=fso.CreateTextFile(fileName, true, true);
	f.Write(text);
	f.Close()
}

function ReadFile(fileName){
	return fso.OpenTextFile(fileName, ForReading, false, TristateTrue).ReadAll();
}

function GetDate(str){
	if (arguments.length)
		return new Date(str);
	else
		return new Date();
}



function GetClickedWord(s) {
	
    var range = s.getRangeAt(0);
    var node = s.anchorNode;
    
    return (range.toString().trim())
    
    /*
	while (range.startOffset !== 0) {                   // start of node
		range.setStart(node, range.startOffset - 1)     // back up 1 char
		if (range.toString().search(/\s/) === 0) {      // space character
		    range.setStart(node, range.startOffset + 1);// move forward 1 char
		    break;
		}
	}
	while (range.endOffset < node.length) {         // end of node
	    range.setEnd(node, range.endOffset + 1)     // forward 1 char
	    if (range.toString().search(/\s/) !== -1) { // space character
	        range.setEnd(node, range.endOffset - 1);// back 1 char
	        break;
	    }
	}
    return range.toString().trim();
   */
}


// string functions 
function format() {
	var args = Array.prototype.slice.call(arguments, 0);
  	return args.join('');
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function SeriesReplace(text, patches)
{
	patches.forEach(function(r) {
		text=text.replace(r[0], r[1]);
	});
	return text;
}

function nl2br (str, is_xhtml) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Philip Peterson
  // +   improved by: Onno Marsman
  // +   improved by: Atli Þór
  // +   bugfixed by: Onno Marsman
  // +      input by: Brett Zamir (http://brett-zamir.me)
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Maximusya
  // *     example 1: nl2br('Kevin\nvan\nZonneveld');
  // *     returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
  // *     example 2: nl2br("\nOne\nTwo\n\nThree\n", false);
  // *     returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
  // *     example 3: nl2br("\nOne\nTwo\n\nThree\n", true);
  // *     returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}


function htmlentities(rawStr)
{
	return rawStr.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
	   return '&#'+i.charCodeAt(0)+';';
	});
}

function RemoveSetting(setting, key)
{
	var settings, searchFor;
	
	if (setting.length==0) return;
	
	if (typeof key=="undefined")
		searchFor=["^(Set )?"+setting + "(\\(.*?\\))?=[^\r\n]+$"];	
	else if (eval(setting+".Exists('"+key+"')"))
		//alert("setting found");
		searchFor=["^"+setting + '\\("'+key+'"\\)=' + "[^\r\n]+$"];
	else
		return;
			
	var fsoSettings=fso.OpenTextFile(settingsFile, ForReading, false, TristateTrue);
	settings=fsoSettings.ReadAll();
	fsoSettings.Close();	

	for (var i in searchFor)
		//alert(searchFor[i]);
		settings=settings.replace(new RegExp(searchFor[i], "gim"), '');
	
	var fsoSettings=fso.OpenTextFile(settingsFile, ForWriting, false, TristateTrue)
	fsoSettings.Write (settings);
	fsoSettings.Close()
}

