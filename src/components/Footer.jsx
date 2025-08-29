const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className='text-[20px] text-center py-4'>
        <p>&copy; {currentYear} All Rights Reserved</p>
      </footer>
    );
  }
  
  export default Footer;
  