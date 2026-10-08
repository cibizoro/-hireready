-- Sample DSA Questions
INSERT INTO dsaquestion (title, description, difficulty, category, example_input, example_output, constraints) VALUES 
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'Easy', 'Array', '[2,7,11,15], 9', '[0,1]', '2 <= nums.length <= 10^4'),
('Reverse Linked List', 'Given the head of a singly linked list, reverse the list, and return the reversed list.', 'Medium', 'Linked List', 'head = [1,2,3,4,5]', '[5,4,3,2,1]', 'The number of nodes in the list is the range [0, 5000].');

-- Sample Aptitude Questions
INSERT INTO aptitude_question (question_text, optiona, optionb, optionc, optiond, correct_answer, category) VALUES 
('If a train runs at 60 km/hr, it reaches its destination late by 11 minutes but if it runs at 70 km/hr it is late by 9 minutes only. The correct time for the train to complete its journey is:', '13 min', '15 min', '19 min', '21 min', 'Option C', 'Quantitative');
