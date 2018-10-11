# About APIYIO

### Overview

The APIYIO app is a fun app using popular APIs. The app includes connectivity to two APIs - 
The `GIPHY API` loads random giphys based on a category you select.
The `OMDB API` loads the poster and details of the movie of your choice.

### FEATURES

**GIPHY TAB**

1. The app loads with the _Giphy tab_ selected by default.

2. The Giphy tab has two sections
    _User Input_ : allows the user to create a new button with a different giphy category/topic. User fields include Category/Topic, desired rating and a fun color for the button.
    _Category Buttons_ : This section houses all the preloaded buttons, as well as all the buttons created by the user *in that session*. Refreshing the app/page will delete all the user created buttons.

3. Clicking on a button will load `10 random giphys` based on the category of the button.

4. If you wish to preserve (in this session) the currently displayed giphys, and request another 10 to be added to the window, just switch the `Preserve Giphys` toggle on. If you wish to clear the screen and get a set of 10 new giphys, just switch the preserve giphys toggle off. Switching to the Movie tab will automatically toggle the preserve toggle off.

5. Each giphy displayed in the main window, has _DownLoad_ , _Favorite_(Star), _Delete_(Trash) icon under it.

6. Clicking on the `Download` icon will download the _still image_ of the giphy to your machine.

7. Clicking on the `Favorite`(star) icon will store the giphy to your favorites list. This means until you remove the giphy from your favorites list, it will load at the top of the main window, when app is refreshed, Giphy tab is clicked or any category button is clicked.

8. To remove/delete a giphy from the favorites list, click on the blue `Trash` icon so that it switches back to the star icon.


**MOVIE TAB**

1. Clicking on the _Movie tab_ will load the movie section which connects to the OMDB API.

2. The Movie tab has two sections
    _User Input_ : allows the user to create a new button with a different movie. User fields include Movie name, Year (optional) and a fun color for the button.
    _Movie Buttons_ : This section houses all the preloaded buttons, as well as all the buttons created by the user *in that session*. Refreshing the app/page will delete all the user created buttons.

3. Clicking on a movie button will load the `poster` as well as the `plot`, and other details about the movie.

4. If you wish to preserve (in this session) the currently displayed movie, and request another movie to be added to the window, just switch the `Preserve Movies` toggle on. If you wish to clear the screen and display just the latest movie, just switch the preserve movies toggle off. Switching to the Giphy tab will automatically toggle the preserve toggle off.


**Hope you have fun**