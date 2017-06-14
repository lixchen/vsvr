#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

;上下左右
	CapsLock & j::Send {left}
	CapsLock & k::Send {down}
	CapsLock & l::Send {right}
	CapsLock & i::Send {up}
;selector
	::getbi::getElementById('');{left 3}
	::getbc::getElementsByClassName('');{left 3}
	::getbt::getElementsByTagName('');{left 3}
	::ques::querySelector('');{left 3}
	::quesa::querySelectorAll(''){left 3}
;timer
	::sett::setTimeout(, 1000);{left 8}
	::seti::setInterval(, 1000);{left 8}
	::clei::clearInterval();{left 2}
	::clet::clearTimeout();{left 2}
;Dom
	::cree::document.createElement('');{left 3}
	::appc::appendChild();{left 2}
;Event
	::adde::addEventListener('',, false);{left 11}
;typecheck
	::objc::Object.prototype.toString.call('');{left 3}
;normal
	::js::JavaScript
	::nodejs::Node.js
	
