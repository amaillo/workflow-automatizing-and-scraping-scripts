// ==UserScript==
// @name          Niche & GreatSchools Search Linker
// @namespace     http://tampermonkey.net/
// @version       2025-10-16
// @description   Transforms Niche's list of schools into direct links to Google searches, saving you the time of copying, pasting, and cleaning up each school's name.
// @author        Ricardo M (amaillo)
// @match         https://www.niche.com/k12/*
// @match         https://www.greatschools.org/*
// @icon          https://www.google.com/s2/favicons?sz=64&domain=niche.com
// @grant         none
// ==/UserScript==

setTimeout(()=>{

	// Check if the user is on the Niche search results page
    if(window.location.href.includes("https://www.niche.com/k12/search/")){
        let i = 4
        const allSchoolNames = document.getElementsByTagName("h2")
        const allSchoolElements = document.getElementsByClassName("MuiTypography-root MuiTypography-inherit MuiLink-root MuiLink-underlineHover")
        
		// Adds a visual indicator (color change) on middle click for progress tracking
        while(allSchoolNames[i]){
            allSchoolNames[i].addEventListener("auxclick",(e)=>{
                e.currentTarget.style.color="purple"
            })
            i=i+2
        }
        
        i = 0
        const schoolDataElm = document.querySelectorAll("[data-testid='search-result__title']")

		// Iterate over the results to transform direct links into Google searches
        while(allSchoolElements[i]){
            const schoolName = schoolDataElm[i].innerText.replace("&","%26")
            
			// Thorough cleaning of the city name and removal of school-related suffixes to improve search SEO
            const cityName = schoolDataElm[i].nextSibling.innerText.split("\n")[0]
            .replace("K-1","")
            .replace("K-2","")
            .replace("K-3","")
            .replace("K-4","")
            .replace("K-5","")
            .replace("K-6","")
            .replace("K-7","")
            .replace("K-8","")
            .replace("K-9","")
            .replace("PK","")
            .replace("School District","")
            .replace("Public Schools","")
            .replace("Public School","")
            .replace("Charter Schools","")
            .replace("Schools","")
            .replace("School","")
            .replace("Unified","")
            .replace("Independent","")
            .replace("Elementary","")
            .replace("College","")
            .replace("Preparatory","")
            .replace("Academies","")
            
			// Replaces the original link destination with an email directory search query
            allSchoolElements[i].href= `https://www.google.com/search?q=${schoolName +" " + cityName +" elementary email directory greatschools.org"}&sourceid=chrome&ie=UTF-8`
            i=i+1
        }
    }
    
	// If the search redirects to GreatSchools, it automatically scrolls to the contact section
    if(window.location.href.includes("https://www.greatschools.org/")){
        document.getElementsByClassName("contact")[0].parentNode.parentNode.scrollIntoView({ behavior: "smooth" })
        return
    }

},400)