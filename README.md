# SharedWorker Example

This example demonstrates how to account for connections to a SharedWorker
instance between tabs/windows.

We use the 'unload' event on the window to signal the worker that the connection
is not needed anymore and notify other windows of it.

The curious thing seems to be, that at the time of this writing, the
initialization function needs to be wrapped in `setTimeout` in order to function
properly, even with a timeout value of 0!

