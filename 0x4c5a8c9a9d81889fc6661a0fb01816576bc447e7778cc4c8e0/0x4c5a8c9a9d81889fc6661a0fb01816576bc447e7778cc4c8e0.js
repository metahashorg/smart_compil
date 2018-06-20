function setTimeout(f, time) {
   let startTime = new Date().getTime();
   let endTime = startTime + time; 
   let now = startTime;
   while (now < endTime) {
      now = new Date().getTime()
   }
   f()
}