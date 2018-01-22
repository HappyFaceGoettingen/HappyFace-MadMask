# Madfox Addon (for Linux)

## Make destination of browser screens
mkdir -v /tmp/madfox.$USER

## Save and close tabs
sleep 3; xdotool key Shift+Ctrl+s

## Save tabs
sleep 3; xdotool key Shift+Alt+s

# How to test
## Install an Addon "Extension Auto-Installer" to Firefox
## Run jpm remote loader
jpm watchpost --post-url http://localhost:8888

## Run in a browser with new profile
jpm run -b $(which firefox)
