<?php

namespace GameOfLife;

class Grid
{

    /**
     * @var int
     */
    private $width;

    /**
     * @var int
     */
    private $height;

    /**
     * @var array
     */
    public $cells = [];

    public function __construct(int $width, int $height)
    {
        $this->width = $width;
        $this->height = $height;
        $this->cells = array_fill(0, $height, array_fill(0, $width, 0));
    }

    public function fillRandom(): void
    {
        foreach ($this->cells as $x => $row) {
            foreach ($row as $y => $cell) {
                $this->cells[$x][$y] = rand(0, 1);
            }
        }
    }

    public function clear(): void
    {
        echo "\033[K";
        echo "\033[0;0H";
    }

    public function printGrid(): void
    {
        $output = "";
        foreach ($this->cells as $row) {
            foreach ($row as $cell) {
                $output .= $cell > 0 ? 0 : " ";
            }
            $output .= "\n";
        }
        echo $output;
    }

    public function getWidth(): int
    {
        return $this->width;
    }

    /**
     * @return int
     */
    public function getHeight(): int
    {
        return $this->height;
    }
}
