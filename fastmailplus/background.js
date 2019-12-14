

chrome.tabs.onUpdated.addListener(onTabUpdated);


var urlpattern = "https://www.fastmail.com/settings/users"

function onTabUpdated(tabId, changeInfo, tab) {

	if (tab.url.includes(urlpattern)) {
		console.log("Found fastmail tab");
		chrome.tabs.executeScript(tabId,{"file":"aliasgrouper.js"});
		
					

	}
}
