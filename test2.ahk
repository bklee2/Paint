IEGet( name="" )
{
   IfEqual, Name,, WinGetTitle, Name, ahk_class IEFrame ; Get active window if no parameter
   Name := ( Name="New Tab - Windows Internet Explorer" ) ? "about:Tabs" : RegExReplace( Name, " - (Windows|Microsoft) Internet Explorer" )
   For pwb in ComObjCreate( "Shell.Application" ).Windows
      If ( pwb.LocationName = Name ) && InStr( pwb.FullName, "iexplore.exe" )
         Return pwb
}

^1::
	IniRead doctor, data.ini, data, doctor
	IniRead year, data.ini, data, year
	IniRead month, data.ini, data, month
	IniRead day, data.ini, data, day
	;MsgBox doctor: %doctor%, %year%%month%%day%
		
	;WB := ComObjCreate( "InternetExplorer.Application" ) ;인터넷 익스플로러
	WB := IEGet("Google")
	WB := IEGet("")
	WB.navigate("http://naver.com") ;웹사이트 주소
	While WB.readyState <> 4 || WB.document.readyState != "complete" || WB.busy
	Sleep, 100 ;잠시 멈춤
	
	;WB.document.getElementById( "log_id" ).value :=  "afoce"  ;아이디를 입력합니다.
	;WB.document.getElementById( "log_pw" ).value :=  "비밀번호"  ;비밀번호를 입력합니다. 
	;WB.document.querySelectorAll("a")[31].click() ;로그인정보를 서버에 전송합니다.
	WB.Visible := true  ;인터넷창을 
	WB.document.getElementByID( "query" ).focus()
	;WB.document.getElementByID( "query" ).value :=  ""  

Return
