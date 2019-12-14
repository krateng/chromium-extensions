var fieldsets = document.getElementsByTagName("fieldset");

var aliaslist;

function fastmailplusplus_position() {
	var offset = 0;
	for (let a of aliases) {
		if (a.style.display == "none") {
			offset -= 46;
		}
		else {
			a.style.top = (parseInt(a.dataset.original_position) + offset) + "px";
		}
		
	}
}

function fastmailplusplus_collapse() {
	var num = parseInt(this.dataset.header_domainnum);
	this.onclick = fastmailplusplus_expand;
	//var domain_aliases = document.getElementsByClassName("fastmailplusplus_domain_" + num);
	//var domain_aliases = document.querySelectorAll("[data-alias_domainnum='" + num + "']")
	for (let a of aliases) {
		if (a.dataset.alias_domainnum == num) {
			a.style.display = "none";
		}
	}
	fastmailplusplus_position()
	//this.classList.add("fastmailplusplus_domainheader_collapsed");
	
}
function fastmailplusplus_expand() {
	var num = parseInt(this.dataset.header_domainnum);
	this.onclick = fastmailplusplus_collapse;
	//var domain_aliases = document.getElementsByClassName("fastmailplusplus_domain_" + num);
	//var domain_aliases = document.querySelectorAll("[data-alias_domainnum='" + num + "']")
	for (let a of aliases) {
		if (a.dataset.alias_domainnum == num) {
			a.style.display = "";
		}
	}
	fastmailplusplus_position()
	//this.classList.add("fastmailplusplus_domainheader_collapsed");
	
}

try {

	for (let fs of fieldsets) {
		if (fs.getElementsByTagName("legend")[0].innerHTML == "Aliases") {
			aliaslist = fs.getElementsByClassName("v-ResourceList")[0];
			break;
		}
	}


	var aliases = aliaslist.children;

	console.log("Found",aliases.length,"aliases")

	var currentdomain = "";
	var domainnum = 0;
	var offset = 0;



	for (let a of aliases) {
		if (!a.classList.contains("fastmailplusplus_domainheader")) {
			var domain = a.getElementsByTagName("div")[0].getElementsByTagName("div")[0].childNodes[1].textContent;
			
			if (domain == currentdomain) {
				
			}
			
			else {
				currentdomain = domain;
				domainnum++;
				
				var header = document.createElement("DIV");
				header.classList.add("fastmailplusplus_domainheader");
				header.dataset.header_domainnum = domainnum;
				header.classList.add("v-ResourceItem");
				header.innerHTML = domain;
				header.style.top = offset + "px";
				header.dataset.original_position = offset;
				header.style.position = "absolute";
				header.style.backgroundColor = "#4e5e74";
				header.style.paddingLeft = "20px";
				header.onclick = fastmailplusplus_expand;
				
				offset += 46;
				aliaslist.insertBefore(header,a);
				
			}
			//a.style.top = offset + "px";
			a.style.display = "none";
			a.dataset.alias_domainnum = domainnum;
			a.dataset.original_position = offset;
			offset += 46;
		}
		else if (a.classList.contains("fastmailplusplus_domainheader")) {
			currentdomain = a.innerHTML;
			domainnum++;
			//a.style.top = offset + "px";
			a.dataset.original_position = offset;
			a.style.top = (46 * (domainnum-1)) + "px";
			offset += 46;
		}
	}
	
}
catch (e) {
	//throw e;
}
