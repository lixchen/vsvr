
Write(lxc) 
{
	WinActivate ahk_exe EXCEL.EXE
	Send ^c{tab}
	WinActivate 页属性定义1	
	SetControlDelay -1	
	ControlClick, %lxc%, 页属性定义1,,,, NA
	Send ^v{Backspace}
}

Escape::ExitApp

Pause::
loop 9 {
	;起始页
	IfWinExist ahk_exe EXCEL.EXE 
	{
		WinActivate
		Send {Home}{down}^c{tab}
		IfWinExist 页属性定义1 
		{
			WinActivate	
			SetControlDelay -1	
			ControlClick, ThunderRT6TextBox11, 页属性定义1,,,, NA
			Send ^v{Backspace}
		} 
		Else 
		{
			return
		}
	}


Write("ThunderRT6TextBox8")   ;责任者
Write("ThunderRT6TextBox7")   ;文件编号
Write("ThunderRT6TextBox5")   ;文件题名
Write("ThunderRT6TextBox3")   ;成文时间
Write("ThunderRT6TextBox4")   ;页数
Write("ThunderRT6TextBox9")   ;人物
Write("ThunderRT6TextBox10")   ;主题词
Write("ThunderRT6TextBox2")   ;附件题名

SetControlDelay -1
ControlClick, ThunderRT6CommandButton4, 页属性定义1,,,, NA
Sleep 100
IfWinActive 提醒
{
Send {enter}
}
Sleep 400
}

