set -ue

bugsnag-cli upload js --api-key=$BUGSNAG_API_KEY --version-name $JE2BE_VERSION --overwrite --bundle build/ts/script/front.js --source-map build/ts/script/front.js.map --bundle-url https://je2be.app/script/front.js
bugsnag-cli upload js --api-key=$BUGSNAG_API_KEY --version-name $JE2BE_VERSION --overwrite --bundle build/ts/script/converter.js --source-map build/ts/script/converter.js.map --bundle-url https://je2be.app/script/converter.js
bugsnag-cli upload js --api-key=$BUGSNAG_API_KEY --version-name $JE2BE_VERSION --overwrite --bundle build/ts/sworker.js --source-map build/ts/sworker.js.map --bundle-url https://je2be.app/sworker.js
