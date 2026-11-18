document.addEventListener("DOMContentLoaded", async () => {
    await fetchProfile();
    if (localStorage.getItem("user")) {

        if((userId % 2) == 0){
            profileElements.profilePicture.style.backgroundImage = "url('../Elements/Profile2n.png')";
        } else if((userId % 3) == 0){
            profileElements.profilePicture.style.backgroundImage = "url('../Elements/Profile3n.png')";
        } else if((userId % 5) == 0){
            profileElements.profilePicture.style.backgroundImage = "url('../Elements/Profile5n.png')";
        } else if((userId % 7) == 0){
            profileElements.profilePicture.style.backgroundImage = "url('../Elements/Profile7n.png')";
        } else {
            profileElements.profilePicture.style.backgroundImage = "url('../Elements/Profile1n.png')";
        }

        try {
            if (profileElements.userNameElement && localStorage.getItem("username")) {
                profileElements.userNameElement.innerText = localStorage.getItem("username");
            }

            if (profileElements.emailElement && localStorage.getItem("email")) {
                profileElements.emailElement.innerText = localStorage.getItem("email"); 
            }

            if (profileElements.ageElement && localStorage.getItem("age")) {
                profileElements.ageElement.innerText = localStorage.getItem("age"); 
            }

            if (profileElements.heightElement && localStorage.getItem("height")) {
                profileElements.heightElement.innerText = localStorage.getItem("height");
            } 

            if (profileElements.weightElement && localStorage.getItem("weight")) {
                profileElements.weightElement.innerText = localStorage.getItem("weight");
            } 

            if (profileElements.genderElement && localStorage.getItem("gender")) {
                profileElements.genderElement.innerText = localStorage.getItem("gender");
            } 

            if (profileElements.activityLevelElement && localStorage.getItem("activityLevel")) {
                profileElements.activityLevelElement.innerText = lowercaseExceptFirst(localStorage.getItem("activityLevel").replace(/_/g, " "));
            } 

            if (profileElements.goalElement && localStorage.getItem("goal")) {
                profileElements.goalElement.innerText = lowercaseExceptFirst(localStorage.getItem("goal").replace(/_/g, " "));
            }
        } catch (error) {
            console.error("Gagal membaca data user dari storage:", error);
        }  
    }
});

function lowercaseExceptFirst(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  }

  const firstLetter = str.charAt(0);
  const restOfString = str.slice(1).toLowerCase();

  return firstLetter + restOfString;
}