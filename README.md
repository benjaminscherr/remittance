# B9 Labs Remittance Project

## Purpose
B9 Labs Academy Ethereum Developer project to continue applying Solidity security best practices and design patterns

## Project Requirements
Create a Remittance smart contract that does the following:

- there are three people: Alice, Bob & Carol.
- Alice wants to send funds to Bob, but she only has ether & Bob does not care about Ethereum and wants to be paid in local currency.
- luckily, Carol runs an exchange shop that converts ether to local currency.
- Therefore, to get the funds to Bob, Alice will allow the funds to be transferred through Carol's exchange shop. Carol will collect the ether from Alice and give the local currency to Bob.

The steps involved in the operation are as follows:

1) Alice creates a Remittance contract with Ether in it and a puzzle.
2) Alice sends a one-time-password to Bob; over SMS, say.
3) Alice sends another one-time-password to Carol; over email, say.
4) Bob treks to Carol's shop.
5) Bob gives Carol his one-time-password.
6) Carol submits both passwords to Alice's remittance contract.
7) Only when both passwords are correct does the contract yield the Ether to Carol.
8) Carol gives the local currency to Bob.
9) Bob leaves.
10) Alice is notified that the transaction went through.
11) Since they each have only half of the puzzle, Bob & Carol need to meet in person so they can supply both passwords to the contract. This is a security measure. It may help to understand this use-case as similar to a 2-factor authentication.
