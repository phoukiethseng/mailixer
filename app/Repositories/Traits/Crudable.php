<?php

namespace App\Repositories\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use ReflectionClass;

trait CRUDable
{
    protected string $table = "";
    protected string $primaryKey = "id";
    protected $attributes = [];
    public function __construct()
    {
    }
    private function query()
    {
        // Check required param before doing any database query
        if (sizeof($this->attributes) < 1) {
            throw new \Exception("Entity must have at least one attribute");
        }

        if ($this->table == "") {
            throw new \Exception("`table` name has not been set");
        }

        return DB::table($this->table);
    }
    public function findAll()
    {
        return $this->query()->get();
    }
    public function findById($modelId)
    {
        return $this->query()->where($this->primaryKey, $modelId)->first();
    }
    public function getNewInstance($attributes)
    {

    }
    public function save($model)
    {
        $attributeArr = $model;
        if ($model instanceof Model) {
            $attributeArr = $model->toArray();
        }

        Log::debug($attributeArr);
        $mapper = function ($key) use ($attributeArr) {
            return $attributeArr[$key];
        };

        if ($model->id) {
            $this->query()->where($this->primaryKey, $model->id)->update(
                array_map($mapper, $this->attributes)
            );
        } else {
            $tmp = array_fill_keys($this->attributes, "");
            // Log::debug(array_map($mapper, $tmp));
            $id = $this->query()->insertGetId(
                array_map($mapper, $tmp)
            );
            $model->id = $id;
        }
        return $model;
    }
    public function delete($model)
    {
        if ($model->id) {
            $this->query()->where($this->primaryKey, $model->id)->delete();
        }
    }
}