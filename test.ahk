^`::
	ClipSaved := ClipboardAll ; 클립보드 보존/복구 1
	Send, {Home}{Shift Down}{End}{Shift Up}^c
	
	; https://github.com/ahkon/MS-Office-COM-Basics/blob/master/Examples/Excel/Find.ahk
	FindThis := Clipboard ;"김영삼"  ; Look for this.
	Clipboard := ClipSaved ; 클립보드 보존/복구 2
	ClipSaved = ; 클립보드 보존/복구 3
	
	xlApp := ComObjActive("Excel.Application")
;MsgBox,  %FindThis%
;MsgBox,  %Clipboard%
	LastRow := xlApp.ActiveSheet.UsedRange.Rows.Count  ; Get the number of rows in the used range.
	MyRange := xlApp.ActiveSheet.Range("A1:Z" LastRow)  ; Get the range of all cells in columns A-Z in the used range.
	LastCell := MyRange.Cells(MyRange.Cells.Count)  ; The last cell MyRange.

	; Find the first cell.
	xlValues := -4163
	xlWhole := 1
	FoundCell := MyRange.Find(FindThis, LastCell, xlValues, xlWhole)  ; LookIn:=xlValues, LookAt:=xlWhole
	FirstAddr := FoundCell.Address  ; The while-loop below will exit when it reaches this cell.
	if (!FoundCell)
		return
	;MsgBox, % "The first found cell in the range is " FirstAddr " with a value of '" FoundCell.Value "'."

	StringMid, lineNum, FirstAddr, 4, 1
	birthday := xlApp.Range("C" . lineNum).Value
	StringMid, birthday, birthday, 3, 6
	SendInput, {TAB}%birthday%{TAB 2}
	
	phone := xlApp.Range("A" . lineNum).Value
	StringMid, phone2, phone, 4, 4
	StringMid, phone3, phone, 8, 4
	SendInput, 010{TAB}%phone2%{TAB}%phone3%+{TAB 3}
	

	;MsgBox, %phone%
	;MsgBox, %birthday%
	
	
	;n2 := xlApp.Range(%addr3%).Value
	;MsgBox, %n2%
	;FirstAddr
	;name := xlApp.Range(addr3).Value
	;MsgBox, %name%
	;MsgBox, %name%
	xlApp.Range(FirstAddr).Select
/*
	; Repeat the search.
	try while FoundCell := MyRange.FindNext(FoundCell)
	{
		if (FoundCell.Address = FirstAddr)  ; Loop has wrapped around to the first found cell. Exit the loop.
			break
		MsgBox, % "The next found cell in the range is " FoundCell.Address " with a value of '" FoundCell.Value "'."
	}
*/	
	;name := xlApp.Range("B4").Value
	;MsgBox, %name%
	;xlApp.Range("B3").Select
	
Return
