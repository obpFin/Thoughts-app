import moment from 'moment';

// Get visible thoughts
export default (thoughts, { text, sortBy, startDate, endDate }) => {
  return thoughts.filter((thought) => {
    const createdAtMoment = moment(thought.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = thought.text.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a,b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1 
    } 
  });
};