package com.hireready.backend.config;

import com.hireready.backend.model.AptitudeQuestion;
import com.hireready.backend.model.DSAQuestion;
import com.hireready.backend.model.User;
import com.hireready.backend.repository.AptitudeQuestionRepository;
import com.hireready.backend.repository.DSAQuestionRepository;
import com.hireready.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DSAQuestionRepository dsaRepository;
    private final AptitudeQuestionRepository aptitudeRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, 
                      DSAQuestionRepository dsaRepository, 
                      AptitudeQuestionRepository aptitudeRepository, 
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.dsaRepository = dsaRepository;
        this.aptitudeRepository = aptitudeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Seeding default users...");
            User user = User.builder()
                    .email("user@hireready.com")
                    .password(passwordEncoder.encode("password"))
                    .fullName("HireReady User")
                    .role("ROLE_USER")
                    .build();
            userRepository.save(user);

            User admin = User.builder()
                    .email("admin@hireready.com")
                    .password(passwordEncoder.encode("password"))
                    .fullName("Admin")
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
        }

        if (dsaRepository.count() < 10) {
            dsaRepository.deleteAll(); // Clear old questions to avoid duplicates
            System.out.println("Seeding DSA questions...");
            dsaRepository.saveAll(List.of(
                // Array
                DSAQuestion.builder().title("Two Sum").description("Find two numbers that add up to target.").difficulty("Easy").category("Array")
                    .exampleInput("nums = [2,7,11,15], target = 9").exampleOutput("[0,1]")
                    .testCaseInput("2,7,11,15\n9").expectedOutput("[0,1]").build(),
                DSAQuestion.builder().title("Contains Duplicate").description("Check if any value appears at least twice.").difficulty("Easy").category("Array")
                    .exampleInput("nums = [1,2,3,1]").exampleOutput("true")
                    .testCaseInput("1,2,3,1").expectedOutput("true").build(),
                DSAQuestion.builder().title("Maximum Subarray").description("Find the contiguous subarray with the largest sum.").difficulty("Medium").category("Array")
                    .exampleInput("nums = [-2,1,-3,4,-1,2,1,-5,4]").exampleOutput("6")
                    .testCaseInput("-2,1,-3,4,-1,2,1,-5,4").expectedOutput("6").build(),
                DSAQuestion.builder().title("Rotate Array").description("Rotate an array to the right by k steps.").difficulty("Medium").category("Array")
                    .exampleInput("nums = [1,2,3,4,5,6,7], k = 3").exampleOutput("[5,6,7,1,2,3,4]")
                    .testCaseInput("1,2,3,4,5,6,7\n3").expectedOutput("[5,6,7,1,2,3,4]").build(),
                DSAQuestion.builder().title("Three Sum").description("Find all unique triplets that sum to zero.").difficulty("Medium").category("Array")
                    .exampleInput("nums = [-1,0,1,2,-1,-4]").exampleOutput("[[-1,-1,2],[-1,0,1]]")
                    .testCaseInput("-1,0,1,2,-1,-4").expectedOutput("[[-1,-1,2],[-1,0,1]]").build(),
                
                // String
                DSAQuestion.builder().title("Reverse String").description("Reverse an array of characters.").difficulty("Easy").category("String")
                    .exampleInput("s = [\"h\",\"e\",\"l\",\"l\",\"o\"]").exampleOutput("[\"o\",\"l\",\"l\",\"e\",\"h\"]")
                    .testCaseInput("hello").expectedOutput("olleh").build(),
                DSAQuestion.builder().title("Valid Palindrome").description("Check if a string is a palindrome.").difficulty("Easy").category("String")
                    .exampleInput("s = \"race a car\"").exampleOutput("false")
                    .testCaseInput("raceacar").expectedOutput("false").build(),
                DSAQuestion.builder().title("Longest Substring").description("Find the length of the longest substring without repeating characters.").difficulty("Medium").category("String")
                    .exampleInput("s = \"abcabcbb\"").exampleOutput("3")
                    .testCaseInput("abcabcbb").expectedOutput("3").build(),
                DSAQuestion.builder().title("String to Integer (atoi)").description("Convert a string to a 32-bit signed integer.").difficulty("Medium").category("String")
                    .exampleInput("s = \"   -42\"").exampleOutput("-42")
                    .testCaseInput("   -42").expectedOutput("-42").build(),
                DSAQuestion.builder().title("Longest Palindromic Substring").description("Find the longest palindromic substring in s.").difficulty("Medium").category("String")
                    .exampleInput("s = \"babad\"").exampleOutput("bab")
                    .testCaseInput("babad").expectedOutput("bab").build(),

                // Linked List
                DSAQuestion.builder().title("Reverse Linked List").description("Reverse a singly linked list.").difficulty("Easy").category("Linked List")
                    .exampleInput("head = [1,2,3,4,5]").exampleOutput("[5,4,3,2,1]")
                    .testCaseInput("1,2,3,4,5").expectedOutput("5,4,3,2,1").build(),
                DSAQuestion.builder().title("Middle of Linked List").description("Find the middle node of a linked list.").difficulty("Easy").category("Linked List")
                    .exampleInput("head = [1,2,3,4,5,6]").exampleOutput("[4,5,6]")
                    .testCaseInput("1,2,3,4,5,6").expectedOutput("4,5,6").build(),
                DSAQuestion.builder().title("Merge Two Sorted Lists").description("Merge two sorted linked lists.").difficulty("Easy").category("Linked List")
                    .exampleInput("l1 = [1,2,4], l2 = [1,3,4]").exampleOutput("[1,1,2,3,4,4]")
                    .testCaseInput("1,2,4\n1,3,4").expectedOutput("1,1,2,3,4,4").build(),
                DSAQuestion.builder().title("Linked List Cycle").description("Determine if a linked list has a cycle.").difficulty("Easy").category("Linked List")
                    .exampleInput("head = [3,2,0,-4], pos = 1").exampleOutput("true")
                    .testCaseInput("3,2,0,-4\npos=1").expectedOutput("true").build(),
                DSAQuestion.builder().title("Remove Nth Node").description("Remove the nth node from the end of the list.").difficulty("Medium").category("Linked List")
                    .exampleInput("head = [1,2,3,4,5], n = 2").exampleOutput("[1,2,3,5]")
                    .testCaseInput("1,2,3,4,5\n2").expectedOutput("1,2,3,5").build(),
                
                // Stack & Queue
                DSAQuestion.builder().title("Valid Parentheses").description("Determine if the input string has valid parentheses.").difficulty("Easy").category("Stack")
                    .exampleInput("s = \"()[]{}\"").exampleOutput("true")
                    .testCaseInput("()[]{}").expectedOutput("true").build(),
                DSAQuestion.builder().title("Min Stack").description("Design a stack that supports push, pop, top, and retrieving the minimum element.").difficulty("Medium").category("Stack")
                    .exampleInput("[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\"]").exampleOutput("[null,null,null,null,-3]")
                    .testCaseInput("MinStack,push,push,push,getMin\n[],[-2],[0],[-3],[]").expectedOutput("[null,null,null,null,-3]").build(),
                DSAQuestion.builder().title("Evaluate Reverse Polish Notation").description("Evaluate the value of an arithmetic expression in RPN.").difficulty("Medium").category("Stack")
                    .exampleInput("tokens = [\"2\",\"1\",\"+\",\"3\",\"*\"]").exampleOutput("9")
                    .testCaseInput("2,1,+,3,*").expectedOutput("9").build(),
                DSAQuestion.builder().title("Daily Temperatures").description("Find how many days you have to wait until a warmer temperature.").difficulty("Medium").category("Stack")
                    .exampleInput("temperatures = [73,74,75,71,69,72,76,73]").exampleOutput("[1,1,4,2,1,1,0,0]")
                    .testCaseInput("73,74,75,71,69,72,76,73").expectedOutput("[1,1,4,2,1,1,0,0]").build(),
                DSAQuestion.builder().title("Largest Rectangle in Histogram").description("Find the area of the largest rectangle in the histogram.").difficulty("Hard").category("Stack")
                    .exampleInput("heights = [2,1,5,6,2,3]").exampleOutput("10")
                    .testCaseInput("2,1,5,6,2,3").expectedOutput("10").build(),

                // Tree
                DSAQuestion.builder().title("Inorder Traversal").description("Return the inorder traversal of a binary tree's nodes' values.").difficulty("Easy").category("Tree")
                    .exampleInput("root = [1,null,2,3]").exampleOutput("[1,3,2]")
                    .testCaseInput("1,null,2,3").expectedOutput("[1,3,2]").build(),
                DSAQuestion.builder().title("Maximum Depth of Binary Tree").description("Find the maximum depth of a binary tree.").difficulty("Easy").category("Tree")
                    .exampleInput("root = [3,9,20,null,null,15,7]").exampleOutput("3")
                    .testCaseInput("3,9,20,null,null,15,7").expectedOutput("3").build(),
                DSAQuestion.builder().title("Symmetric Tree").description("Check whether a binary tree is a mirror of itself.").difficulty("Easy").category("Tree")
                    .exampleInput("root = [1,2,2,3,4,4,3]").exampleOutput("true")
                    .testCaseInput("1,2,2,3,4,4,3").expectedOutput("true").build(),
                DSAQuestion.builder().title("Binary Tree Level Order Traversal").description("Return the level order traversal of its nodes' values.").difficulty("Medium").category("Tree")
                    .exampleInput("root = [3,9,20,null,null,15,7]").exampleOutput("[[3],[9,20],[15,7]]")
                    .testCaseInput("3,9,20,null,null,15,7").expectedOutput("[[3],[9,20],[15,7]]").build(),
                DSAQuestion.builder().title("Lowest Common Ancestor").description("Find the LCA of two given nodes in the BST.").difficulty("Medium").category("Tree")
                    .exampleInput("root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8").exampleOutput("6")
                    .testCaseInput("6,2,8,0,4,7,9,null,null,3,5\n2,8").expectedOutput("6").build(),

                // Hash Map
                DSAQuestion.builder().title("Roman to Integer").description("Convert a roman numeral to an integer.").difficulty("Easy").category("Hash Map")
                    .exampleInput("s = \"LVIII\"").exampleOutput("58")
                    .testCaseInput("LVIII").expectedOutput("58").build(),
                DSAQuestion.builder().title("Valid Anagram").description("Determine if s is an anagram of t.").difficulty("Easy").category("Hash Map")
                    .exampleInput("s = \"anagram\", t = \"nagaram\"").exampleOutput("true")
                    .testCaseInput("anagram,nagaram").expectedOutput("true").build(),
                DSAQuestion.builder().title("Group Anagrams").description("Group strings that are anagrams of each other.").difficulty("Medium").category("Hash Map")
                    .exampleInput("strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]").exampleOutput("[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]")
                    .testCaseInput("eat,tea,tan,ate,nat,bat").expectedOutput("[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]").build(),
                DSAQuestion.builder().title("Two Sum II").description("Two sum but the array is sorted.").difficulty("Medium").category("Hash Map")
                    .exampleInput("numbers = [2,7,11,15], target = 9").exampleOutput("[1,2]")
                    .testCaseInput("2,7,11,15\n9").expectedOutput("[1,2]").build(),
                DSAQuestion.builder().title("Longest Consecutive Sequence").description("Find the length of the longest consecutive elements sequence.").difficulty("Hard").category("Hash Map")
                    .exampleInput("nums = [100,4,200,1,3,2]").exampleOutput("4")
                    .testCaseInput("100,4,200,1,3,2").expectedOutput("4").build()
            ));
        }

        if (aptitudeRepository.count() == 0) {
            System.out.println("Seeding Aptitude questions...");
            aptitudeRepository.saveAll(List.of(
                AptitudeQuestion.builder().questionText("What is 15% of 2000?").optionA("200").optionB("300").optionC("400").optionD("500").correctAnswer("B").category("Quantitative").build()
            ));
        }
        
        System.out.println("Database seeding completed.");
    }
}
