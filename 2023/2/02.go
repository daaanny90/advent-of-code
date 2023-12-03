package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
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

func getPossibleGameId(input string) (int, error) {
	maxRed := 12
	maxGreen := 13
	maxBlue := 14

	reGameNumber := regexp.MustCompile(`Game (\d+):`)
	matchGameNumber := reGameNumber.FindStringSubmatch(input)
	if len(matchGameNumber) != 2 {
		return 0, fmt.Errorf("could not extract game number")
	}
	gameNumber, err := strconv.Atoi(matchGameNumber[1])
	if err != nil {
		return 0, fmt.Errorf("error converting game number: %v", err)
	}

	id := gameNumber

	input = strings.TrimPrefix(input, matchGameNumber[0])

	rounds := strings.Split(input, ";")

	re := regexp.MustCompile(`(\d+)\s+(\w+)`)
	for _, round := range rounds {
		matches := re.FindAllStringSubmatch(round, -1)

		red := 0
		green := 0
		blue := 0

		for _, match := range matches {

			quantity, err := strconv.Atoi(match[1])
			if err != nil {
				return 0, fmt.Errorf("error converting quantity: %v", err)
			}
			color := match[2]

			if color == "red" {
				red += quantity
			}

			if color == "green" {
				green += quantity
			}

			if color == "blue" {
				blue += quantity
			}
		}

		if red > maxRed || green > maxGreen || blue > maxBlue {
			return 0, nil
		}
	}
	return id, nil
}

func part1() {
	input, err := readInput()

	var ids = 0

	if err != nil {
		fmt.Println(err)
		return
	}

	for _, game := range input {
		possibleId, err := getPossibleGameId(game)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		ids += possibleId
	}
	fmt.Println(ids)
}

func getMinimumCubesNumber(input string) (int, error) {
	inputs := strings.SplitAfterN(input, ":", 2)
	rounds := strings.Split(inputs[1], ";")
	re := regexp.MustCompile(`(\d+)\s+(\w+)`)

	red := 0
	green := 0
	blue := 0

	power := 0
	for _, round := range rounds {
		matches := re.FindAllStringSubmatch(round, -1)
		for _, match := range matches {
			quantity, err := strconv.Atoi(match[1])
			if err != nil {
				return 0, fmt.Errorf("error converting quantity: %v", err)
			}
			color := match[2]

			if color == "red" && quantity > red {
				red = quantity
			}

			if color == "green" && quantity > green {
				green = quantity
			}

			if color == "blue" && quantity > blue {
				blue = quantity
			}
		}
		power = (red * green * blue)
	}
	return power, nil
}

func part2() {
	input, err := readInput()

	sum := 0

	if err != nil {
		fmt.Println(err)
		return
	}

	for _, game := range input {
		minCubes, err := getMinimumCubesNumber(game)
		if err != nil {
			fmt.Println("Error:", err)
			return
		}

		sum += minCubes
	}

	fmt.Println(sum)
}

func main() {
	part1()
	part2()
}
