Based on a graph by
[**@mbostock**][block-author]

![cover]

# Assessment 2
For this assignment I had to clean dirty data and show it into a graph. Because this is my re-examination I didn't had to make it interactive, but I already did it for assignment 3, so I re used the same code.

## Dirty code? That's the sh!t I don't like
While searching for a dataset, I remembered the dataset I found while in the class. It was a dataset about asylum requests. This was way more usefull than the one I used for assignment 3. Cleanen the data was easy, because of previous exercises. Simply used: 

```javascript
  if (error) throw error;
  var header = text.indexOf('"Subjects_1";"Periods";"Citizenship";"Total nationality";"Afghan ";"Albanian ";"Azerbaijani ";"Ethiopian ";"Iranian ";"Ivorian ";"Nepalese ";"North Korean ";"Russian "') // MAKE HEADER VARIABLE WITH THE STRING I WANT TO CUT TO
  var end = text.indexOf('\n', header)

	text = text.slice(end).trim()
  text = text.replace(/number/g, '')
  text = text.replace(/;/g, ',')
  text = text.replace(/"/g,'');
```

This selected the header and cuts it of. It also replace all instances of `,"number"` with `` and it replace all instances of `;` with `,`. The last thing it does is replacing the "" with nothing. That pretty much sums it up.

## Including feedback
After I got my feedback back from assignment 3. I was sure not to make the same mistake twice. I got a dataset which made more sense, I structered my code in a better way, made a waaaay better tooltip and the interaction actually makes sense. 

## Conclusion
Assessment 2 wasn't really anything big compared to the last one. I alreade had a lot of stuff done, which I could use again, but in a better way. It's funny looking back at the first time I started assignment 2 and had a loot of trouble with cleaning code, but in reality it's just a few line of code.

## Sources
* [ordering the bars - Titus Wormer](https://github.com/cmda-fe3/course-17-18/tree/master/site/class-4/sort)
* [cleaning the code - Slides from the assignments]
* [main graph - Mike Bostock](https://bl.ocks.org/mbostock/3885304)
* [dataset - CBS](http://statline.cbs.nl/Statweb/publication/?VW=T&DM=SLEN&PA=81478ENG&D1=a&D2=0&D3=0&D4=0-2,4,11,16-17,26,28,31&D5=105,109,113,117,122,126,130,134,139,143,147&HD=160118-1449&LA=EN&HDR=G1,G2,G3&STB=T,G4)
* [Tooltip](https://bl.ocks.org/sarubenfeld/56dc691df199b4055d90e66b9d5fc0d2)

[block-author]: https://github.com/mbostock
[cover]: preview.png
