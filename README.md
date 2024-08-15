### Project 4 - Students Performance Analysis

**Team 9** - Rachel Schoen, Andrea Wu, Mahind Rao, Mahalel Peter

## Introduction

For this project, we sought to explore a means to analyze and predict student performance based off a multitude of different variables, including but not limited to: attendance, taking notes, reading frequency, transporation, scholarships, and even parental status.

## Key Statement
What are the key factors that influence the success of a student? Can we predict a student’s academic performance (e.g., grade point average or success in courses) based on their personal background, study habits, and extracurricular activities?

- How do students with additional work responsibilities fare academically compared to those without?
- How does the type of accommodation affect students' study habits and performance?
- How does discussion and group work influence students' interest and success in their courses?

## Dataset
We obtained the dataset - "Students Performance" from Kaggle.
- Format: CSV file
- Data Source: Dataset from Kaggle
    https://www.kaggle.com/datasets/joebeachcapital/students-performance/data
- Data Structure:
    - Data of 145 students
    - 33 Columns
    - Majority is categorical data

## Work Flow
1. Exploratory Data Analysis
  - Create basic visualizations to observe any trends or patterns using Matplotlib.
  - Create some sort of interactivity with the graphs, using HTML.
  - We learnt that the correlation of the data is very weak in this dataset.

2. SQL Database
  - Populate a SQL database using the CSV file, then connect to the database in order to continue analysis and predictions.
  ![ERDV diagram](https://i.imgur.com/jvNpA4e.png)

3. Data Modeling
  - Create a relational data model, or a graph data model.
  - Use supervised learning.
  - Create a Logistic Regression model.
  - Each of us have tried to build our own model and worked on the optimization. We have combined all our models in the final notebook. 


4. Model Optimization and Evaluation
  - Try using a different number of layers, activations, optimizers, and epochs to maximize the accuracy of our model.
  - Try splitting the data to optimize the model.
  - Try using the Adam algorithm with our model for further optimization.
  - Evaluate the model's performance by creating a confusion matrix and/or a classification report.

## Key finding and conclusion
- Based on the dataset we gathered  we couldn’t predict a student’s academic performance (e.g., grade point average or success in courses) based on their personal background, study habits, and extracurricular activities because the accuracy was low in every model. 

- Moreover, there were no key factors that influence the success of a student.


## Limitation
- Data Structure: The dataset is primarily categorical, which may not provide sufficient detail for models to identify complex patterns or make accurate predictions.
- Multicollinearity: In other words, it’s difficult to determine the individual effects of each variable on the student’s performance, because many of them are dependent on each other.
- Limited Data: While the dataset had a wide breadth of categories, there were only a little under 150 entries in the dataset. This helps to explain the poor accuracy of our models.



## Notes to User
1. Please run the main notebook - "Student Performance Analysis - Notebook"
    - Use the code below to install all the libraries that we used in the code before running the file:
    pip install pandas matplotlib numpy scikit-learn seaborn SQLAlchemy mlxtend
2. User can preview the interactive dashboard of exploratory analysis using the file "index.html" or access through the link below:
    - https://andreawcy.github.io/Project_4_Students-performance-analysis/


## Reference
- Mathewvondersaar. (2023, September 7). Analysis of student performance. Kaggle. https://www.kaggle.com/code/mathewvondersaar/analysis-of-student-performance
- Lgomesl. (2024, February 5). Feature selection Study - Education data. Kaggle. https://www.kaggle.com/code/lgomesl/feature-selection-study-education-data
- Verma, V. (2022, June 22). A comprehensive guide to Feature Selection using Wrapper methods in Python. Analytics Vidhya. https://www.analyticsvidhya.com/blog/2020/10/a-comprehensive-guide-to-feature-selection-using-wrapper-methods-in-python/
- Kaushik, S. (2024, April 30). Introduction to Feature Selection methods with an example. Analytics Vidhya. https://www.analyticsvidhya.com/blog/2016/12/introduction-to-feature-selection-methods-with-an-example-or-how-to-select-the-right-variables/

