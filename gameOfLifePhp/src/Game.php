<?php

namespace GameOfLife;

class Game {

	CONST DEFAUL_WIDTH = 50;
	CONST DEFAUL_HEIGHT = 30;
	CONST DEFAULT_SLEEPTIME = 50000;

	/**
	 * @var Grid
	 */
	private $grid;

	public function __construct() {
		$this->grid = new Grid(self::DEFAUL_WIDTH, self::DEFAUL_HEIGHT);
		$this->grid->fillRandom();
		$this->grid->clear();
		$this->play();
	}

	public function play(): void {
		while (true) {
			$this->grid->printGrid();
			$this->newGeneration();
			usleep(self::DEFAULT_SLEEPTIME);
			$this->grid->clear();
		}
	}

	private function getAliveNeighborCount(int $x, int $y): int {
		$alive_count = 0;
		for ($y2 = $y - 1; $y2 <= $y + 1; $y2++) {
			if ($y2 < 0 || $y2 >= $this->grid->getHeight()) {
				// Out of range.
				continue;
			}
			for ($x2 = $x - 1; $x2 <= $x + 1; $x2++) {
				if ($x2 == $x && $y2 == $y) {
					// Current cell spot.
					continue;
				}
				if ($x2 < 0 || $x2 >= $this->grid->getWidth()) {
					// Out of range.
					continue;
				}
				if ($this->grid->cells[$y2][$x2]) {
					$alive_count += 1;
				}
			}
		}

		return $alive_count;
	}

	private function newGeneration(): void {
		$cells = &$this->grid->cells;
		$killQueue = [];
		$bornQueue = [];

		for ($y = 0; $y < $this->grid->getHeight(); $y++) {
			for ($x = 0; $x < $this->grid->getWidth(); $x++) {
				$neighbor_count = $this->getAliveNeighborCount($x, $y);
				if ($cells[$y][$x] && ($neighbor_count < 2 || $neighbor_count > 3)) {
					$killQueue[] = [$y, $x];
				}
				if (!$cells[$y][$x] && $neighbor_count === 3) {
					$bornQueue[] = [$y, $x];
				}
			}
		}

		foreach ($killQueue as $c) {
			$cells[$c[0]][$c[1]] = 0;
		}

		foreach ($bornQueue as $c) {
			$cells[$c[0]][$c[1]] = 1;
		}
	}
}
