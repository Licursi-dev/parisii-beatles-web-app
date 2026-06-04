// data/quizQuestions.js
// Locked set of 50 Beatles questions (MCQ) + answer facts.
// Format: { id, difficulty, question, options[4], answerIndex, fact }

const QUIZ_QUESTIONS_PART1 = [
    {
      id: 1,
      difficulty: "easy",
      question: "What was The Beatles’ first album called?",
      options: ["Revolver", "Magical Mystery Tour", "Abbey Road", "Please Please Me"],
      answerIndex: 3,
      fact: "Released in 1963, it launched the band’s UK album run."
    },
    {
      id: 2,
      difficulty: "medium",
      question: "“The whole thing of life and all the answers to everything are in one divine law, Karma action and reaction.” Who said it?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "George was deeply influenced by Indian philosophy and spirituality."
    },
    {
      id: 3,
      difficulty: "medium",
      question: "Which Beatles film features the song “Can’t Buy Me Love”?",
      options: ["Help!", "Yellow Submarine", "Magical Mystery Tour", "A Hard Day’s Night"],
      answerIndex: 3,
      fact: "The song appears during a famous outdoor running/playing sequence."
    },
    {
      id: 4,
      difficulty: "easy",
      question: "To which German city did the Beatles move in the early 60s?",
      options: ["Munich", "Frankfurt", "Hamburg", "Dresden"],
      answerIndex: 2,
      fact: "Their Hamburg residencies were crucial to tightening their live sound."
    },
    {
      id: 5,
      difficulty: "easy",
      question: "In which city can you find the real ‘Abbey Road’?",
      options: ["Manchester", "Birmingham", "London", "Glasgow"],
      answerIndex: 2,
      fact: "The zebra crossing is outside EMI Studios (now Abbey Road Studios)."
    },
    {
      id: 6,
      difficulty: "easy",
      question: "What was the Beatles’ first hit song?",
      options: ["Here Comes The Sun", "Get Back", "Love Me Do", "Yellow Submarine"],
      answerIndex: 2,
      fact: "“Love Me Do” was released in 1962 and began their chart rise."
    },
    {
      id: 7,
      difficulty: "medium",
      question: "How many times did the Beatles crown the Billboard Hot 100 in the US?",
      options: ["10", "15", "20", "25"],
      answerIndex: 2,
      fact: "They achieved 20 US #1 singles — an all-time landmark."
    },
    {
      id: 8,
      difficulty: "medium",
      question: "How long is “Let It Be” (single version)?",
      options: ["2:50", "3:20", "3:50", "4:20"],
      answerIndex: 2,
      fact: "One of their signature late-era singles."
    },
    {
      id: 9,
      difficulty: "medium",
      question: "Which record label was founded by the Beatles in 1968?",
      options: ["Rough Trade", "EMI Parlophone", "Virgin", "Atlantic"],
      answerIndex: 1,
      fact: "The band launched their own label/business era around Apple Corps."
    },
    {
      id: 10,
      difficulty: "easy",
      question: "What year were The Beatles formed?",
      options: ["1958", "1959", "1960", "1961"],
      answerIndex: 2,
      fact: "1960 is widely used as the formation year of the band’s core identity."
    },
  
    // Q11–Q25 (as discussed)
    {
      id: 11,
      difficulty: "easy",
      question: "Which Beatle was the youngest member of the band?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "George Harrison was only 14 when he first met Paul McCartney."
    },
    {
      id: 12,
      difficulty: "easy",
      question: "Which Beatles album features the song “Lucy in the Sky with Diamonds”?",
      options: ["Revolver", "Sgt Pepper’s Lonely Hearts Club Band", "Abbey Road", "Rubber Soul"],
      answerIndex: 1,
      fact: "Sgt Pepper was released in 1967 and became a defining album of the era."
    },
    {
      id: 13,
      difficulty: "easy",
      question: "Who was the Beatles’ original drummer before Ringo Starr?",
      options: ["Pete Best", "Stu Sutcliffe", "Alan White", "Billy Preston"],
      answerIndex: 0,
      fact: "Pete Best was dismissed in 1962 just before the band’s biggest breakthrough."
    },
    {
      id: 14,
      difficulty: "easy",
      question: "What was the name of the club where the Beatles played frequently in Liverpool?",
      options: ["The Marquee", "The Cavern Club", "The Roundhouse", "The Empire"],
      answerIndex: 1,
      fact: "The Beatles performed nearly 300 times at The Cavern Club."
    },
    {
      id: 15,
      difficulty: "easy",
      question: "Which instrument did Ringo Starr primarily play?",
      options: ["Bass", "Lead Guitar", "Drums", "Keyboard"],
      answerIndex: 2,
      fact: "Ringo’s feel and timing became a signature part of the Beatles’ sound."
    },
    {
      id: 16,
      difficulty: "easy",
      question: "Which album includes the song “Come Together”?",
      options: ["Let It Be", "Abbey Road", "Help!", "Magical Mystery Tour"],
      answerIndex: 1,
      fact: "Abbey Road was the last album the Beatles recorded together."
    },
    {
      id: 17,
      difficulty: "medium",
      question: "Who wrote the majority of “Something”?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "“Something” became one of the most covered Beatles songs."
    },
    {
      id: 18,
      difficulty: "easy",
      question: "What year did the Beatles perform on The Ed Sullivan Show?",
      options: ["1962", "1963", "1964", "1965"],
      answerIndex: 2,
      fact: "Over 70 million Americans watched their first Ed Sullivan appearance."
    },
    {
      id: 19,
      difficulty: "easy",
      question: "Which Beatles song begins with the lyric “Yesterday, all my troubles seemed so far away”?",
      options: ["Hey Jude", "Let It Be", "Yesterday", "Blackbird"],
      answerIndex: 2,
      fact: "“Yesterday” is among the most-recorded songs in history."
    },
    {
      id: 20,
      difficulty: "easy",
      question: "Which city is known as the birthplace of The Beatles?",
      options: ["London", "Liverpool", "Manchester", "Leeds"],
      answerIndex: 1,
      fact: "All four Beatles were born in Liverpool."
    },
    {
      id: 21,
      difficulty: "easy",
      question: "Which Beatles album was the last to be released?",
      options: ["Abbey Road", "Let It Be", "Help!", "Revolver"],
      answerIndex: 1,
      fact: "Let It Be was released in 1970 after the band had already broken up."
    },
    {
      id: 22,
      difficulty: "easy",
      question: "Who managed The Beatles during their rise to fame?",
      options: ["George Martin", "Brian Epstein", "Phil Spector", "Allen Klein"],
      answerIndex: 1,
      fact: "Brian Epstein discovered the Beatles at The Cavern Club in 1961."
    },
    {
      id: 23,
      difficulty: "easy",
      question: "Which instrument did Paul McCartney famously play left-handed?",
      options: ["Drums", "Piano", "Bass", "Violin"],
      answerIndex: 2,
      fact: "Paul’s Höfner bass became one of the most iconic instruments in rock history."
    },
    {
      id: 24,
      difficulty: "medium",
      question: "Which Beatles song was banned by the BBC for lyrical content?",
      options: ["Hey Jude", "A Day in the Life", "All You Need Is Love", "Help!"],
      answerIndex: 1,
      fact: "It was banned due to alleged drug references."
    },
    {
      id: 25,
      difficulty: "medium",
      question: "Which album marked a major shift toward psychedelic music?",
      options: ["Rubber Soul", "Sgt Pepper", "With The Beatles", "Beatles for Sale"],
      answerIndex: 1,
      fact: "Sgt Pepper is often cited as an early “concept album” landmark."
    },
  ];

  const QUIZ_QUESTIONS_PART2 = [

    {
      id: 26,
      difficulty: "medium",
      question: "What rooftop did the Beatles perform their final live concert on?",
      options: ["EMI Studios", "Apple Corps", "The Cavern", "Royal Albert Hall"],
      answerIndex: 1,
      fact: "The rooftop concert took place on January 30, 1969."
    },
    {
      id: 27,
      difficulty: "medium",
      question: "Which Beatles song includes a famous orchestral crescendo?",
      options: ["Hey Jude", "A Day in the Life", "Let It Be", "Help!"],
      answerIndex: 1,
      fact: "A 40-piece orchestra was used for the climactic build."
    },
    {
      id: 28,
      difficulty: "easy",
      question: "Who was known as 'The Quiet Beatle'?",
      options: ["John Lennon", "George Harrison", "Paul McCartney", "Ringo Starr"],
      answerIndex: 1,
      fact: "The nickname referred to George’s reserved personality."
    },
    {
      id: 29,
      difficulty: "easy",
      question: "Which Beatles album features the cover with the band crossing a zebra crossing?",
      options: ["Abbey Road", "Let It Be", "Help!", "Rubber Soul"],
      answerIndex: 0,
      fact: "The Abbey Road cover became one of the most recreated album covers ever."
    },
    {
      id: 30,
      difficulty: "medium",
      question: "Which Beatles song was their longest at over 7 minutes?",
      options: ["Hey Jude", "Let It Be", "Come Together", "Help!"],
      answerIndex: 0,
      fact: "“Hey Jude” runs just over 7 minutes long."
    },
  
    {
      id: 31,
      difficulty: "easy",
      question: "Which Beatles member married Yoko Ono?",
      options: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"],
      answerIndex: 1,
      fact: "John and Yoko married in 1969 in Gibraltar."
    },
    {
      id: 32,
      difficulty: "medium",
      question: "Which Beatles album features the song 'Eleanor Rigby'?",
      options: ["Revolver", "Rubber Soul", "Help!", "Abbey Road"],
      answerIndex: 0,
      fact: "The track famously used a string octet instead of a rock band."
    },
    {
      id: 33,
      difficulty: "easy",
      question: "Which Beatles film was animated?",
      options: ["Yellow Submarine", "Help!", "Magical Mystery Tour", "A Hard Day’s Night"],
      answerIndex: 0,
      fact: "The Beatles themselves had minimal involvement in the film’s production."
    },
    {
      id: 34,
      difficulty: "easy",
      question: "What year did The Beatles officially break up?",
      options: ["1968", "1969", "1970", "1971"],
      answerIndex: 2,
      fact: "Paul McCartney publicly announced the breakup in April 1970."
    },
  
    {
      id: 35,
      difficulty: "medium",
      question: "Which Beatles song was recorded in a single take?",
      options: ["Twist and Shout", "Help!", "Paperback Writer", "Rain"],
      answerIndex: 0,
      fact: "John Lennon’s voice was nearly gone, so the band captured it in one take."
    },
    {
      id: 36,
      difficulty: "medium",
      question: "Which producer worked closely with the Beatles at EMI?",
      options: ["Brian Epstein", "George Martin", "Phil Spector", "Clive Davis"],
      answerIndex: 1,
      fact: "George Martin is often called the 'Fifth Beatle.'"
    },
    {
      id: 37,
      difficulty: "medium",
      question: "Which Beatles song features tape loops created by John Lennon at home?",
      options: ["Tomorrow Never Knows", "I Am the Walrus", "Across the Universe", "Lucy in the Sky with Diamonds"],
      answerIndex: 0,
      fact: "Lennon brought homemade tape loops that were fed into the mixing desk live."
    },
    {
      id: 38,
      difficulty: "medium",
      question: "Which Beatle temporarily left the band in 1969?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "George left briefly during the tense Get Back recording sessions."
    },
    {
      id: 39,
      difficulty: "medium",
      question: "Which Beatles song was inspired by a newspaper article about a car accident?",
      options: ["A Day in the Life", "Help!", "Yesterday", "Let It Be"],
      answerIndex: 0,
      fact: "The lyrics referenced the death of Tara Browne."
    },
    {
      id: 40,
      difficulty: "medium",
      question: "Which Beatles album was released in 1966?",
      options: ["Revolver", "Abbey Road", "Help!", "Sgt Pepper"],
      answerIndex: 0,
      fact: "Revolver marked a turning point toward studio experimentation."
    },
  
    {
      id: 41,
      difficulty: "medium",
      question: "Which Beatles member wrote 'Here Comes the Sun'?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "George wrote it while relaxing in Eric Clapton’s garden."
    },
    {
      id: 42,
      difficulty: "medium",
      question: "Which Beatles album includes 'Helter Skelter'?",
      options: ["The White Album", "Revolver", "Help!", "Abbey Road"],
      answerIndex: 0,
      fact: "The song is often cited as an early influence on heavy metal."
    },
    {
      id: 43,
      difficulty: "medium",
      question: "Which Beatles song was the band’s first US number one hit?",
      options: ["Love Me Do", "I Want to Hold Your Hand", "Help!", "She Loves You"],
      answerIndex: 1,
      fact: "It topped the US charts in early 1964."
    },
  
    {
      id: 44,
      difficulty: "medium",
      question: "Which Beatles song was originally titled 'Scrambled Eggs'?",
      options: ["Yesterday", "Blackbird", "Michelle", "Eleanor Rigby"],
      answerIndex: 0,
      fact: "Paul used 'Scrambled Eggs' as placeholder lyrics while composing."
    },
    {
      id: 45,
      difficulty: "medium",
      question: "Which Beatles album was the first to credit George Harrison with three songs?",
      options: ["Revolver", "Rubber Soul", "Help!", "Abbey Road"],
      answerIndex: 0,
      fact: "Revolver marked George’s growing confidence as a songwriter."
    },
  
    {
      id: 46,
      difficulty: "medium",
      question: "Which Beatles album cover shows the band in butcher smocks?",
      options: ["Yesterday and Today", "Revolver", "Help!", "With The Beatles"],
      answerIndex: 0,
      fact: "The controversial 'Butcher Cover' was quickly withdrawn."
    },
    {
      id: 47,
      difficulty: "medium",
      question: "Which Beatles song was released as a double A-side with 'Strawberry Fields Forever'?",
      options: ["Penny Lane", "Come Together", "Something", "Help!"],
      answerIndex: 0,
      fact: "Both songs were released together in 1967."
    },
    {
      id: 48,
      difficulty: "medium",
      question: "Which Beatles song was banned in some countries for its perceived drug references?",
      options: ["Lucy in the Sky with Diamonds", "Hey Jude", "Something", "Come Together"],
      answerIndex: 0,
      fact: "Despite speculation, the band denied the title was an LSD reference."
    },
    {
      id: 49,
      difficulty: "medium",
      question: "Which Beatles song features a rare drum solo by Ringo Starr?",
      options: ["The End", "Rain", "Ticket to Ride", "Helter Skelter"],
      answerIndex: 0,
      fact: "Ringo rarely performed drum solos, making this moment notable."
    },
    {
      id: 50,
      difficulty: "medium",
      question: "Which Beatles member released the album 'All Things Must Pass'?",
      options: ["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"],
      answerIndex: 2,
      fact: "It became one of the most successful solo Beatles albums."
    }
  ];
  
  export const quizQuestions = [
    ...QUIZ_QUESTIONS_PART1,
    ...QUIZ_QUESTIONS_PART2
  ];

  