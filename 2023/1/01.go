package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func readInput() ([]string, error) {
	file, err := os.Open("input.txt")

	if err != nil {
		return nil, err
	}
	defer file.Close()

	var lines []string
	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines, nil
}

var numberDictionary = map[string]string{
	"one":   "1",
	"two":   "2",
	"three": "3",
	"four":  "4",
	"five":  "5",
	"six":   "6",
	"seven": "7",
	"eight": "8",
	"nine":  "9",
}

func processInput() ([]string, error) {
	input, err := readInput()
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	return input, nil
}

func extractDigits(line string) []string {
	var digits []string
	for _, match := range line {
		if unicode.IsDigit(match) {
			digits = append(digits, string(match))
		}
	}
	return digits
}

func calculateNumber(digits []string) (int, error) {
	firstDigit := digits[0]
	lastDigit := digits[len(digits)-1]
	values, err := strconv.Atoi(firstDigit + lastDigit)
	if err != nil {
		fmt.Println("Error conversion:", err)
		return 0, err
	}
	return values, nil
}

func part1() {
	input, err := processInput()
	if err != nil {
		return
	}

	totalCalibrationValues := 0

	for _, line := range input {
		digits := extractDigits(line)
		number, err := calculateNumber(digits)
		if err != nil {
			return
		}
		totalCalibrationValues += number
	}

	fmt.Println(totalCalibrationValues)
}

func part2() {
	input, err := processInput()
	if err != nil {
		return
	}

	totalCalibrationValues := 0

	for _, line := range input {
		for num := range numberDictionary {
			line = strings.ReplaceAll(line, num, num+numberDictionary[num]+num)
		}

		digits := extractDigits(line)
		number, err := calculateNumber(digits)
		if err != nil {
			return
		}

		totalCalibrationValues += number
	}

	fmt.Println(totalCalibrationValues)
}

func main() {
	part1()
	part2()
}
