export default function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    return formattedDate;
  }