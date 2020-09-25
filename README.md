Simple Auto Reload
==================

This extension uses the [DevTools protocol](https://github.com/cyrus-and/chrome-remote-interface/) (available in most browsers) to auto reload a page after saving files.

It requires no browser extension or code changes.


Setup
-----

Make sure your browser is running with remote debugging port enabled.

* Chrome: `google-chrome --remote-debugging-port=9222`
* Android: `adb forward tcp:9222 localabstract:chrome_devtools_remote`
* Opera: `opera --remote-debugging-port=9222`
* Safari (iOS): Install and run [iOS WebKit Debug Proxy](https://github.com/google/ios-webkit-debug-proxy)
* Edge: `MicrosoftEdge.exe --devtools-server-port 9222`
* Firefox: `firefox --remote-debugging-port 9222`


Usage
-----

Once the browser is running, use the command `Auto Reload: select tab` to choose
which of the currently open tabs will be reloaded when saving. That's it. Next
time you save a file, that tab will reload.

If you want to stop reloading, run the command `Auto Reload: stop`.


Configuration
-----
Delay - It is possible to delay the reload by a specified amount to allow for any upload/build times that occur after save.
Host - Host settings for connections are configurable in extension settings. *Please note most browsers require extra configuration for (or in the case of Chrome seem not to allow at all) connections from remote machines, although workarounds do exist.*