Amazon Review Data Scrapper:

Please make sure to go to the following address: https://nodejs.org/download/

and download and install nodejs for your particular machine configuration before trying out the actuall tool.

To use this tool you would need the following this before starting the tools:

	1) ASIN - The amazon serial identification number - This can be found out in the URL on the review page of Amazon.
		  Navigate to the review page of a product that allows you to view all the reviews for a particular product. Check the URL for the following pattern
		  http://www.amazon.com/Apple-iPhone-Silver-16-Unlocked/product-reviews/B00NQGP3L6 - where the last entry in the URL is the ASIN of the product. Copy this.

	2) Name of the Product - The name of the product is used to create the file containing the review data. The file is a .csv file that can be imported into programs
				 like Excel or Google Spreadsheet. The first row of data represents the headings.

	3) Max number of Review Pages - If you scroll down on the review page you can see numbers that represent how many pages of reviews does Amazon have. Pick the max number
					that is shown there.

	4) File Type - Please enter either txt or csv. CSV files allow for easy import into Excel/Spreadsheet whereas the txt file are more useful for text mining/word cloud purposes. The txt file is a combination of all the different comments that have been left for a particular product.

To Run the Application

	1) Download the folder and unzip. Move folder to Desktop.
	2) Open Terminal and enter the following command.
		cd Desktop/Amazon-Scrapper-master/
	3) Now enter :  chmod +x start.sh
	4) Now enter : ./start.sh
	5) Enter ASIN
	6) Enter Product Name
	7) Enter Max Number of Pages
	8) Follow Prompts
