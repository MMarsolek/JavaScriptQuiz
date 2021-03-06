# JavaScriptQuiz
A short quiz to test your JavaScript knowledge. The quiz can be accessed by going to the GitHub deployed site [Here](https://mmarsolek.github.io/JavaScriptQuiz/) or by right-clicking on the index.html file and selecting "Open in Default Browser".

![openInDefaultBrowser](https://user-images.githubusercontent.com/75141165/148337962-a5586bda-fda5-48dc-af14-166f04722618.png)




## Sources and Copy Right
- All Audio was sourced royalty free from [PickaBay](https://pixabay.com/sound-effects/search/correct/). More information on their Terms of Service can be found [here](https://pixabay.com/service/terms/#license).


## Considerations
- When user inputs there name, there is a chance that they will choose to put an empty string or just a nothing. A modal has been added to prompt the user to either add a name, or to click the retry button. 
![modal](https://user-images.githubusercontent.com/75141165/148337220-342317ac-146d-49d7-894e-91e75d5aa0ec.PNG)



- Changed the background color to match the results of the question for those that are hard of hearing. This means the body turns red when the user answers incorrect and green when they answer correctly.
- Results are sorted by the percentage that the user got and further sorted by the time remaining. 
- Questions and answers are all stored in an array of objects so that they can be easily updated. 
- Game history is saved in LocalStorage so that it will remain even when the page is reloaded or closed. Only the top ten will be displayed.
