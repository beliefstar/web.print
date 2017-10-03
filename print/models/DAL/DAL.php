<?php 

	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PWD', '');
	define('DB_DATABASE', 'index');

	/**
	* 数据库操作类
	*/
	class DAL
	{
		
		private $__PDO = null;

		private function connection()
		{
			if(isset($this->__PDO)) return;
			$dsn = "mysql:host=" .DB_HOST .";dbname=" .DB_DATABASE .";";
			try {
				$this->__PDO = new PDO($dsn, DB_USER, DB_PWD);
				$this->__PDO->query('set names utf8;');
			} catch (PDOException $e) {
				echo "连接失败" .$e->getMessage();
			}
		}
		private function execute($sql, $param)
		{
			$this->connection();
			$stmt = $this->__PDO->prepare($sql);
			if($param != null)
			{
				if(is_array($param))
				{
					foreach ($param as $key => $value)
					{
						if(array_keys($param) === range(0, count($param) - 1))
						{
							$key++;
						}
						$stmt->bindValue($key, $value);
					}
				}
				else
				{
					$stmt->bindValue(1, $param);
				}
			}
			$stmt->execute();
			return $stmt;
		}
		/**
		 * 查询
		 * select(sql, [param=null, type=PDO::FETCH_ASSOC])
		 * 
		 * return array
		 */
		public function select($sql, $param = null, $type = PDO::FETCH_ASSOC)
		{
			$stmt = $this->execute($sql, $param);
			return $stmt->fetchAll($type);
		}
		/**
		 * 插入
		 * insert(sql, param)
		 *
		 * return lastInsetId or 0
		 */
		public function insert($sql, $param)
		{
			$stmt = $this->execute($sql, $param);
			if($stmt->rowCount() > 0)
			{
				return $this->__PDO->lastInsertId();
			}
			else
			{
				return 0;
			}
		}
		/**
		 * 更新、删除(表操作)
		 * getBool(sql, [param = null])
		 *
		 * return true or false
		 */
		public function getBool($sql, $param = null)
		{
			$stmt = $this->execute($sql, $param);
			if($stmt->rowCount() > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		/**
		 * 关闭数据库连接
		 */
		public function close()
		{
			$this->__PDO = null;
		}
	}
	
 ?>